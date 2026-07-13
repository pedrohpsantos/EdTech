variable "service_name" {
  description = "Cloud Run service name."
  type        = string
}

variable "environment_suffix" {
  description = "Suffix for resources like Secrets (empty for prod)"
  type        = string
  default     = ""
}

variable "location" {
  description = "Region where the service is deployed."
  type        = string
}

variable "image_url" {
  description = "Docker image URL in Artifact Registry or GCR."
  type        = string
}

variable "bucket_name" {
  description = "GCS bucket name used by the backend."
  type        = string
}

variable "cors_allowed_origin" {
  description = "Allowed CORS origin for the frontend."
  type        = string
}

variable "db_connection_name" {
  description = "Cloud SQL connection name."
  type        = string
}

variable "vpc_connector_id" {
  type = string
}
