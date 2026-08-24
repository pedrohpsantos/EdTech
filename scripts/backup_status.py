# /// script
# requires-python = ">=3.11"
# dependencies = ["google-cloud-storage", "rich"]
# ///
"""
EdTech — Verificador de Status de Backups
==========================================
Lista os backups do PostgreSQL armazenados no GCS e verifica se o backup
mais recente tem menos de 25 horas (tolerância de 1 hora sobre o ciclo diário).

Uso:
    uv run scripts/backup_status.py

Pré-requisitos:
    - GOOGLE_APPLICATION_CREDENTIALS ou gcloud autenticado via ADC.
    - GCP_PROJECT_ID definido como variável de ambiente (ou ajustar PROJECT_ID abaixo).
"""

import os
import sys
from datetime import datetime, timezone, timedelta

from google.cloud import storage
from rich.console import Console
from rich.table import Table
from rich import print as rprint

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------
PROJECT_ID = os.getenv("GCP_PROJECT_ID") or os.getenv("GOOGLE_CLOUD_PROJECT")
if not PROJECT_ID:
    rprint(
        "[bold red][ERRO][/] Defina a variável de ambiente GCP_PROJECT_ID ou GOOGLE_CLOUD_PROJECT."
    )
    sys.exit(1)

BACKUP_BUCKET = f"edtech-backups-{PROJECT_ID}"
MAX_AGE_HOURS = 25  # Alerta se o backup mais recente for mais velho que isso

console = Console()


def human_size(size_bytes: int) -> str:
    """Formata bytes de forma legível."""
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def main() -> None:
    console.print("\n[bold blue]📦 EdTech — Status dos Backups do PostgreSQL[/]\n")

    try:
        client = storage.Client(project=PROJECT_ID)
        bucket = client.get_bucket(BACKUP_BUCKET)
    except Exception as exc:
        rprint(
            f"[bold red][ERRO][/] Não foi possível acessar o bucket '[cyan]{BACKUP_BUCKET}[/]': {exc}"
        )
        sys.exit(1)

    blobs = sorted(
        bucket.list_blobs(),
        key=lambda b: b.time_created,
        reverse=True,
    )

    if not blobs:
        rprint(
            f"[bold yellow][AVISO][/] Nenhum backup encontrado em gs://{BACKUP_BUCKET}."
        )
        sys.exit(0)

    # -----------------------------------------------------------------------
    # Tabela de backups
    # -----------------------------------------------------------------------
    table = Table(
        title=f"Backups em gs://{BACKUP_BUCKET}",
        show_header=True,
        header_style="bold cyan",
    )
    table.add_column("#", style="dim", width=4)
    table.add_column("Arquivo", style="white")
    table.add_column("Tamanho", justify="right")
    table.add_column("Criado em (BRT)", justify="right")
    table.add_column("Idade", justify="right")

    brt = timezone(timedelta(hours=-3))
    now = datetime.now(tz=timezone.utc)

    for idx, blob in enumerate(blobs[:10], start=1):  # mostra os 10 mais recentes
        created = blob.time_created
        age = now - created
        age_str = f"{int(age.total_seconds() // 3600)}h {int((age.total_seconds() % 3600) // 60)}min"
        created_brt = created.astimezone(brt).strftime("%d/%m/%Y %H:%M")
        size_str = human_size(blob.size or 0)

        # Destaca o mais recente
        style = "bold green" if idx == 1 else ""
        table.add_row(str(idx), blob.name, size_str, created_brt, age_str, style=style)

    console.print(table)

    # -----------------------------------------------------------------------
    # Verificação de saúde
    # -----------------------------------------------------------------------
    most_recent = blobs[0]
    age_hours = (now - most_recent.time_created).total_seconds() / 3600

    console.print()
    if age_hours <= MAX_AGE_HOURS:
        rprint(
            f"[bold green]✅ SAUDÁVEL:[/] O backup mais recente foi criado há "
            f"[cyan]{age_hours:.1f}h[/] (limite: {MAX_AGE_HOURS}h)."
        )
    else:
        rprint(
            f"[bold red]⚠️  ALERTA:[/] O backup mais recente tem [red]{age_hours:.1f}h[/] "
            f"— excede o limite de {MAX_AGE_HOURS}h! "
            f"Verifique o Cloud Scheduler no GCP Console."
        )
        sys.exit(1)

    console.print()


if __name__ == "__main__":
    main()
