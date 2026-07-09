output "connection_name" {
  description = "A string de conexão usada pelo Cloud Run"
  value       = google_sql_database_instance.instance.connection_name
}
