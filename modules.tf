module "cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.shrek.id
  api_resource_id = aws_api_gateway_rest_api.shrek.root_resource_id
}