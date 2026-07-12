"""Gera um resumo somente-leitura dos documentos visiveis pela API EdTech."""

import argparse
import json
import logging
import os
import sys
from collections import Counter
from datetime import UTC, datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

# Configure basic logging for telemetry
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("telemetry")

def fetch_documents(api_url: str, token: str) -> list[dict]:
    """Busca documentos paginados sem alterar qualquer dado remoto."""
    request = Request(
        f"{api_url.rstrip('/')}/api/documents?size=100",
        headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    )
    with urlopen(request, timeout=15) as response:  # nosec B310: URL fornecida pelo operador
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("content", payload) if isinstance(payload, dict) else payload


def build_report(documents: list[dict]) -> dict:
    """Agrega metadados, evitando expor arquivos ou dados pessoais."""
    statuses = Counter(document.get("status", "UNKNOWN") for document in documents)
    file_types = Counter(document.get("fileType", "UNKNOWN") for document in documents)
    projects = Counter(document.get("projectTitle", "Sem projeto") for document in documents)
    return {
        "generatedAt": datetime.now(UTC).isoformat(),
        "documentCount": len(documents),
        "byStatus": dict(sorted(statuses.items())),
        "byFileType": dict(sorted(file_types.items())),
        "byProject": dict(sorted(projects.items())),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Gera telemetria de documentos da API EdTech.")
    parser.add_argument(
        "--api-url", default=os.getenv("EDTECH_API_URL", "http://localhost:8080"), help="URL da API"
    )
    parser.add_argument(
        "--token", default=os.getenv("EDTECH_API_TOKEN"), help="JWT de uma conta autorizada"
    )
    parser.add_argument("--output", type=Path, help="Arquivo JSON para salvar o resumo")
    args = parser.parse_args()

    if not args.token:
        parser.error("informe --token ou a variavel EDTECH_API_TOKEN")

    try:
        report = build_report(fetch_documents(args.api_url, args.token))
    except HTTPError as error:
        logger.error("A API recusou a consulta: HTTP %s", error.code)
        return 1
    except URLError as error:
        logger.error("Nao foi possivel conectar a API: %s", error.reason)
        return 1

    rendered = json.dumps(report, ensure_ascii=False, indent=2)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered + "\n", encoding="utf-8")
        logger.info("Resumo salvo em %s", args.output)
    else:
        print(rendered)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
