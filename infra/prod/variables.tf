variable "project_id" {
  description = "GCP project ID."
  type        = string
}

variable "region" {
  description = "GCP region for regional resources."
  type        = string
  default     = "southamerica-east1"
}

variable "zone" {
  description = "GCP zone for zonal resources."
  type        = string
  default     = "southamerica-east1-a"
}

variable "artifact_registry" {
  description = "Artifact Registry hostname prefix used by backend images."
  type        = string
  default     = "southamerica-east1-docker.pkg.dev"
}

variable "backend_image_tag" {
  description = "Backend Docker image tag to deploy."
  type        = string
}

variable "backend_service_name" {
  description = "Cloud Run service name for the backend API."
  type        = string
  default     = "edtech-backend"
}

variable "storage_bucket_name" {
  description = "GCS bucket name used by the application."
  type        = string
}

variable "cors_allowed_origin" {
  description = "Allowed CORS origin for the production frontend."
  type        = string
}

variable "database_instance_name" {
  description = "Cloud SQL instance name."
  type        = string
  default     = "edtech-db-dev"
}

variable "database_version" {
  description = "Cloud SQL PostgreSQL version."
  type        = string
  default     = "POSTGRES_16"
}

variable "database_tier" {
  description = "Cloud SQL instance tier."
  type        = string
  default     = "db-f1-micro"
}
