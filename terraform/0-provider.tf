terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }

    random = {
      source = "hashicorp/random"
      version = "~> 3.0"
    }

    archive = {
      source = "hashicorp/archive"
      version = "~> 2.0"
    }
  }

  cloud { 
    organization = "alshdavid"

    workspaces { 
      name = "hemebook" 
    } 
  } 

  required_version = "~> 1.0"
}

provider "aws" {
  region = "ap-southeast-2"
}

data "aws_region" "current" {}
