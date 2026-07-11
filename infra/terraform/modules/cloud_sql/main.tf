resource "google_sql_database_instance" "instance" {
  name             = var.instance_name
  database_version = var.database_version
  region           = var.region

  settings {
    tier = var.tier
    edition = "ENTERPRISE"

    # Mantém a compatibilidade com a configuração atual (IP Público)
    ip_configuration {
      ipv4_enabled = true
    }
  }

  # Trava de segurança para o Terraform não deletar o banco por engano
  deletion_protection = true
}
