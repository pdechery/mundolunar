terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_instance" "mundolunar" {
  ami           = "ami-058bd2d568351da34"
  instance_type = "t2.micro"
  key_name = "mundolunar"

  vpc_security_group_ids = [aws_security_group.mlsecgrp.id]

  tags = {
    Name = "MundoLunarEC2"
  }
}

resource "aws_security_group" "mlsecgrp" {
  name = "mundolunar_ec2"
  tags = {
    Terraform = "true"
  }
  vpc_id = data.aws_vpc.default.id
}

resource "aws_security_group_rule" "postgres_in" {
  description = "Allow Postgres"
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mlsecgrp.id
}

resource "aws_security_group_rule" "http_in" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mlsecgrp.id
}

resource "aws_security_group_rule" "https_in" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mlsecgrp.id
}

resource "aws_security_group_rule" "ssh_in" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["186.194.199.161/32"]
  security_group_id = aws_security_group.mlsecgrp.id
}

resource "aws_security_group_rule" "all_out" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mlsecgrp.id
}

resource "aws_eip" "ml_instance" {
  instance = aws_instance.mundolunar.id
  domain = "vpc"
}
