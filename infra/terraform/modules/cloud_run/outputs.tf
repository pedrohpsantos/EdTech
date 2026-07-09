output "service_url" {
  description = "A URL pública gerada para acessar a aplicação"
  value       = google_cloud_run_v2_service.api.uri
}
