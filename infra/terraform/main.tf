provider "google" {
  project = var.project_id
  region  = var.region
}

terraform {
  backend "gcs" {}
}

module "storage_app" {
  source = "./modules/cloud_storage"

  bucket_name = var.storage_bucket_name
  location    = var.region
}

module "database" {
  source = "./modules/cloud_sql"

  instance_name    = var.database_instance_name
  database_version = var.database_version
  tier             = var.database_tier
  region           = var.region
}

module "backend_api" {
  source = "./modules/cloud_run"

  service_name        = var.backend_service_name
  location            = var.region
  image_url           = "${var.artifact_registry}/${var.project_id}/cloud-run-source-deploy/edtech-backend:${var.backend_image_tag}"
  bucket_name         = var.storage_bucket_name
  cors_allowed_origin = var.cors_allowed_origin
  db_connection_name  = module.database.connection_name
  environment_suffix  = var.environment_suffix
}

# Os bancos foram criados antes da adoção do state remoto. Importá-los evita
# tentativas de recriação durante o deploy e passa a mantê-los sob gestão.
import {
  to = module.database.google_sql_database.dev_db
  id = "${var.project_id}/${var.database_instance_name}/edtech_dev"
}

import {
  to = module.database.google_sql_database.prod_db
  id = "${var.project_id}/${var.database_instance_name}/edtech_prod"
}
