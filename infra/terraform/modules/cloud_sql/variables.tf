variable "instance_name" {
  description = "Nome exato da instância do banco de dados no GCP"
  type        = string
}

variable "database_version" {
  description = "Versão do motor do banco (ex: POSTGRES_14)"
  type        = string
}

variable "region" {
  description = "Região onde o banco está rodando"
  type        = string
}

variable "tier" {
  description = "O tamanho da máquina (ex: db-f1-micro)"
  type        = string
}

variable "vpc_network_id" {
  description = "ID da VPC para o Private IP do Cloud SQL"
  type        = string
}