resource "google_sql_database_instance" "instance" {
  name             = var.instance_name
  database_version = var.database_version
  region           = var.region

  settings {
    tier    = var.tier
    edition = "ENTERPRISE"

    backup_configuration {
      enabled    = true
      start_time = "03:00"
      point_in_time_recovery_enabled = true
    }

    # Mantém a compatibilidade com a configuração atual (IP Público)
    ip_configuration {
      ipv4_enabled    = false
      private_network = var.vpc_network_id
      require_ssl     = true
    }
  }

  # Trava de segurança para o Terraform não deletar o banco por engano
  deletion_protection = true
}

resource "google_sql_database" "dev_db" {
  name     = "edtech_dev"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_database" "prod_db" {
  name     = "edtech_prod"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "iam_user" {
  name     = "edtech_iam_user"
  instance = google_sql_database_instance.instance.name
  type     = "CLOUD_IAM_USER"
}
