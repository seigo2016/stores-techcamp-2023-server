init:
	curl -X POST localhost:8080/alter -d '{"drop_all": true}'
	curl -X POST localhost:8080/admin/schema --data-binary '@migration/schema.graphql'
	python3 migration/migrate.py

generate-openapi:
	openapi-generator generate -g typescript-axios -i ./openapi.yaml -o ./pos/src/generated --additional-properties=supportsES6=true,useSingleRequestParameter=true
	openapi-generator generate -g typescript-axios -i ./openapi.yaml -o ./brand/src/generated --additional-properties=supportsES6=true,useSingleRequestParameter=true
