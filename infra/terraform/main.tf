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
  log_bucket  = "${var.storage_bucket_name}-logs"
}

module "database" {
  source = "./modules/cloud_sql"

  instance_name    = var.database_instance_name
  database_version = var.database_version
  tier             = var.database_tier
  region           = var.region

  vpc_network_id = data.google_compute_network.default.id

  depends_on = [google_service_networking_connection.private_vpc_connection]
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

  vpc_connector_id = google_vpc_access_connector.connector.id
}

resource "google_vpc_access_connector" "connector" {
  name          = "cloud-run-vpc-connector"
  region        = var.region
  network       = "default"
  ip_cidr_range = "10.8.0.0/28"

  min_instances = 2
  max_instances = 10
}

# These networking resources already protect the live Cloud SQL instance. Importing
# them makes Terraform the source of truth instead of attempting a duplicate create.
import {
  to = google_vpc_access_connector.connector
  id = "projects/${var.project_id}/locations/${var.region}/connectors/cloud-run-vpc-connector"
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = "projects/edtech-storage-501117/global/networks/default"
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = ["google-managed-services-range"]
}

import {
  to = google_service_networking_connection.private_vpc_connection
  id = "projects/${var.project_id}/global/networks/default:servicenetworking.googleapis.com"
}

data "google_compute_network" "default" {
  name = "default" # Ou o nome da sua VPC, se não for 'default'
}

# Os bancos foram criados antes da adoção do state remoto. Importá-los evita
# tentativas de recriação durante o deploy e passa a mantê-los sob gestão.
import {
  to = module.database.google_sql_database_instance.instance
  id = "${var.project_id}/${var.database_instance_name}"
}

import {
  to = module.database.google_sql_database.dev_db
  id = "${var.project_id}/${var.database_instance_name}/edtech_dev"
}

import {
  to = module.database.google_sql_database.prod_db
  id = "${var.project_id}/${var.database_instance_name}/edtech_prod"
}

# Os secrets também já existem nos dois ambientes e precisam ser adotados
# antes que os jobs de migração possam referenciá-los.
import {
  to = module.backend_api.google_secret_manager_secret.jwt_secret
  id = "projects/${var.project_id}/secrets/JWT_SECRET${var.environment_suffix}"
}

import {
  to = module.backend_api.google_secret_manager_secret.spring_password
  id = "projects/${var.project_id}/secrets/SPRING_DATASOURCE_PASSWORD${var.environment_suffix}"
}

import {
  to = module.backend_api.google_secret_manager_secret.spring_url
  id = "projects/${var.project_id}/secrets/SPRING_DATASOURCE_URL${var.environment_suffix}"
}

import {
  to = module.backend_api.google_secret_manager_secret.spring_username
  id = "projects/${var.project_id}/secrets/SPRING_DATASOURCE_USERNAME${var.environment_suffix}"
}
