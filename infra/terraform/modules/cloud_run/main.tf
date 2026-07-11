# criação do projeto
data "google_project" "project" {}

# Declaração dos Secrets no Terraform
resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "JWT_SECRET"
  replication {
    auto {}
  }
}
resource "google_secret_manager_secret" "spring_password" {
  secret_id = "SPRING_DATASOURCE_PASSWORD"
  replication {
    auto {}
  }
}
resource "google_secret_manager_secret" "spring_url" { #
  secret_id = "SPRING_DATASOURCE_URL"
  replication {
    auto {}
  }
}
resource "google_secret_manager_secret" "spring_username" {
  secret_id = "SPRING_DATASOURCE_USERNAME"
  replication {
    auto {}
  }
}

# 2. permissões de acesso para o cloud run
resource "google_secret_manager_secret_iam_member" "jwt_secret_permission" {

  secret_id = google_secret_manager_secret.jwt_secret.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

resource "google_secret_manager_secret_iam_member" "spring_password_permission" {

  secret_id = google_secret_manager_secret.spring_password.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}
resource "google_secret_manager_secret_iam_member" "spring_url_permission" {

  secret_id = google_secret_manager_secret.spring_url.id

  role   = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}
resource "google_secret_manager_secret_iam_member" "spring_username_permission" {
  secret_id = google_secret_manager_secret.spring_username.id

  role   = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}


resource "google_cloud_run_v2_service" "api" {
  client         = "gcloud"
  client_version = "568.0.0"
  name     = var.service_name
  location = var.location
  ingress  = "INGRESS_TRAFFIC_ALL"


  template {
    containers {
      name  = "edtech-backend-1"
      image = var.image_url

      # variaveis de ambiente do projeto

      env {
        name  = "SPRING_PROFILES_ACTIVE"
        value = "prod"
      }

      env {
        name  = "STORAGE_PROVIDER"
        value = "gcs"
      }

      env {
        name  = "GCP_PROJECT_ID"
        value = data.google_project.project.project_id
      }

      env {
        name  = "GCP_BUCKET_NAME"
        value = var.bucket_name
      }

      env {
        name  = "SPRING_JPA_HIBERNATE_DDL_AUTO"
        value = "validate"
      }

      env {
        name  = "CORS_ALLOWED_ORIGINS"
        value = var.cors_allowed_origin
      }

      env {
        name = "JWT_SECRET" #nome no .env.example
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.jwt_secret.id
            version = "latest"
          }
        }
      }
      env {
        name = "SPRING_DATASOURCE_PASSWORD"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.spring_password.id
            version = "latest"
          }
        }
      }
      env {
        name = "SPRING_DATASOURCE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.spring_url.id
            version = "latest"
          }
        }
      }
      env {
        name = "SPRING_DATASOURCE_USERNAME"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.spring_username.id
            version = "latest"
          }
        }
      }
    }


    # Anexando o Cloud SQL ao Cloud Run de forma segura
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [var.db_connection_name]
      }
    }
  }
  lifecycle {
    ignore_changes = [
      template[0].labels
    ]
  }
}
