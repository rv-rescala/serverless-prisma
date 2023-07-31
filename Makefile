ENV_FILE := .env.dev
include $(ENV_FILE)

MODULE_PATH := serverless-prisma

.PHONY: set_env
set_env:
	@export $(shell cat $(ENV_FILE) | xargs)
	@echo "APPNAME: $(APPNAME)"
	@echo "STAGE: $(STAGE)"
	@echo "CIDR: $(CIDR)"
	@echo "VERSION: $(VERSION)"
	@echo "VPC_ID: $(VPC_ID)"
	@echo "DB_INSTANCE_ENDPOINT_ADDRESS: $(DB_INSTANCE_ENDPOINT_ADDRESS)"
	@echo "DB_INSTANCE_IDENTIFER: $(DB_INSTANCE_IDENTIFER)"
	@echo "DB_PASSWORD: $(DB_PASSWORD)"
	@echo "DB_SG_GROUP_ID: $(DB_SG_GROUP_ID)"
	@echo "DB_CLIENT_SG_GROUP_ID: $(DB_CLIENT_SG_GROUP_ID)"
	amplify env checkout $(STAGE)

.PHONY: build
build: set_env
	# For schema migration
	cp user/prisma/shcema.prisma prisma/schema.prisma
	cp user/amplify/schema.gql amplify/backend/api/$(APPNAME)/schema.graphql
	npx prisma generate
	amplify export --out $(MODULE_PATH)/cdk/lib/  --allow-destructive-graphql-schema-updates -y

	# For env
	rm -f .env
	rm $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	rm $(MODULE_PATH)/docker/.env.local
	echo "CREATE SCHEMA $(APPNAME);" > $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(STAGE)-$(APPNAME)\"" > $(MODULE_PATH)/docker/.env.local
	echo "DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(STAGE)-$(APPNAME)"" >> .env

	# Start docker for data migration
	docker-compose -f $(MODULE_PATH)/docker-compose.yaml up -d

	# Schema generation
	tsc $(MODULE_PATH)/scripts/mergeGraphqlSchema.ts
	node $(MODULE_PATH)/scripts/mergeGraphqlSchema.js $(MODULE_PATH) $(APPNAME)
	tsc $(MODULE_PATH)/scripts/createMigrateSQL.ts;

	npx prisma db push

	cdk synth '$(STAGE)/**' -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID) -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)

.PHONY: init-migration
init-migration: set_env
	npx prisma generate;
	npx prisma migrate reset;
	rm -rf prisma/migrations;
	npx prisma migrate dev --name $(VERSION);
	migration_path=$$(find prisma/migrations -type d -name "*$(VERSION)*" -print); node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(STAGE)-$(APPNAME) 1

.PHONY: diff-migration
diff-migration: set_env
	npx prisma generate;
	find prisma/migrations -type d -name "*$(VERSION)*" -print;
	find prisma/migrations -type d -name "*$(VERSION)*" -exec rm -rf {} +;
	npx prisma migrate dev --name $(VERSION) --create-only;
	migration_path=$$(find prisma/migrations -type d -name "*$(VERSION)*" -print); node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(STAGE)-$(APPNAME)

.PHONY: publish
publish: set_env
	amplify push -y
	cdk deploy '$(STAGE)/**' --require-approval never -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	amplify codegen

.PHONY: deploy
deploy: set_env
	cdk deploy '$(STAGE)/**' --require-approval never -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	amplify codegen

.PHONY: run
run: set_env
	@DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(STAGE)-$(APPNAME)"
	@export DATABASE_URL
	npx prisma db push --accept-data-loss
	npx vite-node ./gqlserver/server.ts --watch -- --schema prisma/generated/prisma-appsync/schema.gql --handler gqlserver/handler.ts --watchers '[{"watch":["**/*.prisma","*.prisma"],"exec":" npx prisma generate && npx prisma db push --accept-data-loss && touch ./gqlserver/server.ts"}]'

.PHONY: destroy
destroy: set_env
	cdk destroy '$(STAGE)/$(APPNAME)ResolverStack' -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)CognitoEventStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)AppsyncProxyStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)Amplify-amplify-backend-stack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	amplify env checkout dev
	amplify env remove $(STAGE)
	cdk destroy '$(STAGE)/$(APPNAME)LambdaStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)RDSStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)

.PHONY: dev-destroy
dev-destroy: set_env
	cdk destroy '$(STAGE)/$(APPNAME)ResolverStack' -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)CognitoEventStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)AppsyncProxyStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)Amplify-amplify-backend-stack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	amplify delete
	cdk destroy '$(STAGE)/$(APPNAME)LambdaStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
	cdk destroy '$(STAGE)/$(APPNAME)RDSStack' --force -c appname=$(APPNAME) -c stage=$(STAGE) -c schema=$(APPNAME) -c cidr=$(CIDR) -c vpcid=$(VPC_ID)  -c instanceEndpointAddress=$(DB_INSTANCE_ENDPOINT_ADDRESS) -c instanceIdentifier=$(DB_INSTANCE_IDENTIFER) -c password=$(DB_PASSWORD) -c sgGroupId=$(DB_SG_GROUP_ID) -c cliengSgGroupId=$(DB_CLIENT_SG_GROUP_ID)
