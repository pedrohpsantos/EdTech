resource "google_storage_bucket" "bucket" {
  name          = var.bucket_name
  location      = var.location
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  logging {
    log_bucket = var.log_bucket
  }

  encryption {
    default_kms_key_name = var.kms_key_name
  }
}
