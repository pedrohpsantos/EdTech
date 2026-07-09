output "bucket_url" {
  description = "A URL do bucket criado"
  value       = google_storage_bucket.bucket.url
}
