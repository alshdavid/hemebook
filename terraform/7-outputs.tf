output "aws_cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.website_cloudfront.domain_name}"
}

output "aws_cognito" {
  value = "https://${aws_cognito_user_pool.user_pool.domain}.auth.${data.aws_region.current.name}.amazoncognito.com"
}

output "aws_api_gateway" {
  value = aws_apigatewayv2_stage.prod.invoke_url
}

output "aws_website_bucket" {
  value = "http://${aws_s3_bucket_website_configuration.s3_website.website_endpoint}"
}

output "public_url" {
  value = "https://${var.domain_name}"
}
