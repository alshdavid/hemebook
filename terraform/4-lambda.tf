resource "aws_iam_role" "main_lambda_exec" {
  name = format("%s_%s", var.project_name, "function")

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "main_lambda_policy" {
  role = aws_iam_role.main_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "main_lambda" {
  function_name = format("%s_%s", var.project_name, "function")

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key = aws_s3_object.lambda_main.key

  runtime = "nodejs22.x"
  handler = "handler.handler"
  # architectures = ["x86_64"]
  architectures = ["arm64"]

  environment {
    variables = {
      COGNITO_USER_POOL_ID = aws_cognito_user_pool.user_pool.id
      COGNITO_ORIGIN = "https://${var.domain_name_auth}"
      COGNITO_CLIENT_ID = aws_cognito_user_pool_client.client.id
      COGNITO_CLIENT_SECRET = aws_cognito_user_pool_client.client.client_secret
      LOCAL_ORIGIN = "https://${var.domain_name}"
    }
  }

  source_code_hash = data.archive_file.lambda_main.output_base64sha256

  role = aws_iam_role.main_lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "main_logs" {
  #name = "/aws/lambda/${aws_lambda_function.main.function_name}"
  retention_in_days = 14
}

data "archive_file" "lambda_main" {
  type = "zip"

  source_dir = "${path.module}/../packages/hemebook-server/dist"
  output_path = "${path.module}/../packages/hemebook-server/dist/dist.zip"
}

resource "aws_s3_object" "lambda_main" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key = "dist.zip"
  source = data.archive_file.lambda_main.output_path

  etag = filemd5(data.archive_file.lambda_main.output_path)
}
