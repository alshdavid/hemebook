resource "random_string" "random" {
  length = 6
  special = false
  upper = false
}

variable "project_name" {
  type = string
  default = "alshdavid-hemebook"
}

variable "bucket_name" {
  type = string
  default = "hemebook"
}

variable "lambda_role_name" {
  type = string
  default = "hemebook_main_lambda"
}

variable "lambda_function_name" {
  type = string
  default = "hemebook_main_lambda"
}

variable "cognito_domain" {
  type = string
  default = "hemebook"
}

variable "cognito_user_pool_name" {
  type = string
  default = "hemebook_user_pool"
}

variable "cognito_client_name" {
  type = string
  default = "hemebook_oauth_client"
}

variable "domain_name" {
  type = string
  default = "hemebook.online"
}

variable "domain_name_alt" {
  type = string
  default = "www.hemebook.online"
}

variable "domain_name_auth" {
  type = string
  default = "auth.hemebook.online"
}

variable "ssl_cert_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:232293658217:certificate/6a5c336c-f466-4224-9ec8-907c1bb64f48"
}

# variable "google_client_id" {
#   type = string
# }

# variable "google_client_secret" {
#   type = string
# }

