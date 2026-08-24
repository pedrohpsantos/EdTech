variable "bucket_name" {
  description = "Nome do bucket no GCS"
  type        = string
}

variable "location" {
  description = "Localização do bucket"
  type        = string
}

variable "log_bucket" {
  type        = string
  description = "Nome do bucket onde os logs de acesso serão salvos."
  default     = "edtech-access-logs-bucket"
}

variable "kms_key_name" {
  type        = string
  description = "Chave KMS para criptografia."
  default     = "projects/my-project/locations/global/keyRings/my-keyring/cryptoKeys/my-key"
}
