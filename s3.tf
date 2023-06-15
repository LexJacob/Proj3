resource "aws_s3_bucket" "backend" {
  bucket = "team-sequoia-bucket"
  force_destroy = true
   lifecycle {
    prevent_destroy = false
  }
  versioning {
    enabled = true
  }
}

# adding because terraform doesn't support versioning
# versioned data/files won't get deleted with terraform destroy
resource "aws_s3_bucket_versioning" "backend" {
  bucket = aws_s3_bucket.backend.id
  versioning_configuration {
    status = "Enabled"
  }
}




