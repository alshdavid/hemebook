resource "aws_cognito_user_pool" "user_pool" {
  name = var.cognito_user_pool_name

  # username_attributes = ["email"]
  alias_attributes = ["email", "preferred_username"]
  auto_verified_attributes = ["email"]

  username_configuration {
    case_sensitive = true
  }

  password_policy {
    minimum_length = 6
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject = "Account Confirmation"
    email_message = "Your confirmation code is {####}"
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain          = var.domain_name_auth
  certificate_arn = var.ssl_cert_arn
  user_pool_id    = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_user_pool_client" "client" {
  name = var.cognito_client_name

  user_pool_id = aws_cognito_user_pool.user_pool.id
  generate_secret = true
  refresh_token_validity = 90
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  supported_identity_providers = [
    "COGNITO",
    # "Google"
  ]

  callback_urls                        = [
    "https://${var.domain_name}/api/auth/login/callback",
    "${aws_apigatewayv2_stage.prod.invoke_url}api/auth/login/callback",
    "http://localhost:4200/api/auth/login/callback",
    "https://${aws_cloudfront_distribution.website_cloudfront.domain_name}/api/auth/login/callback"
  ]
  logout_urls                          = [
    "https://${var.domain_name}/api/auth/logout/callback",
    "${aws_apigatewayv2_stage.prod.invoke_url}api/auth/logout/callback",
    "http://localhost:4200/api/auth/logout/callback",
    "https://${aws_cloudfront_distribution.website_cloudfront.domain_name}/api/auth/logout/callback"
  ]
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = [
    "email",
    "openid",
  ]
}

resource "aws_cognito_user_pool_domain" "cognito-domain" {
  domain       = var.cognito_domain
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

# resource "aws_cognito_identity_provider" "cognito_google_provider" {
#   user_pool_id  = aws_cognito_user_pool.user_pool.id
#   provider_name = "Google"
#   provider_type = "Google"

#   provider_details = {
#     authorize_scopes = "openid profile email"
#     client_id        = var.google_client_id
#     client_secret    = var.google_client_secret
#   }

#   attribute_mapping = {
#     email    = "email"
#     email_verified    = "email_verified"
#     username = "sub"
#     name = "name"
#     given_name = "given_name"
#     family_name = "family_name"
#     phone_number = "phoneNumbers"
#     birthdate = "birthdays"
#   }
# }
