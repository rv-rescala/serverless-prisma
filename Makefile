ENV_FILE := .env.dev
include $(ENV_FILE)

MODULE_PATH := serverless-prisma
VERSION := init

.PHONY: build
build:
	@export $(shell cat $(ENV_FILE) | xargs)
	@echo "App Name: $(APPNAME)"
	@echo "Env: $(ENV)"
	@echo "Cidr: $(CIDR)"
	@echo "Version: $(VERSION)"

	# For schema migration
	@cp user/prisma/shcema.prisma prisma/schema.prisma
	@cp user/amplify/schema.gql amplify/backend/api/$(APPNAME)/schema.graphql
	@npx prisma generate
	@amplify export --out $(MODULE_PATH)/cdk/lib/ -y

	# For env
	@rm .env
	@rm $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	@rm $(MODULE_PATH)/docker/.env.local
	@echo "CREATE SCHEMA $(APPNAME);" > $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	@echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(APPNAME)\"" > $(MODULE_PATH)/docker/.env.local
	@echo "DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(APPNAME)"" >> .env

	# Start docker for data migration
	@docker-compose -f $(MODULE_PATH)/docker-compose.yaml up -d

	# Schema generation
	@tsc $(MODULE_PATH)/scripts/mergeGraphqlSchema.ts
	@node $(MODULE_PATH)/scripts/mergeGraphqlSchema.js $(MODULE_PATH) $(APPNAME)
	@tsc $(MODULE_PATH)/scripts/createMigrateSQL.ts;

	@if [ "$(VERSION)" = "init" ]; then \
		npx prisma migrate reset; \
		rm -rf prisma/migrations; \
		npx prisma migrate dev --name $(VERSION); \
		migration_path=$$(find prisma/migrations -type d -name "*$(VERSION)*" -print); \
		node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(APPNAME) 1; \
	else \
		find prisma/migrations -type d -name "*$(VERSION)*" -print; \
		find prisma/migrations -type d -name "*$(VERSION)*" -exec rm -rf {} \; \
		migration_path=$$(find prisma/migrations -type d -name "*$(VERSION)*" -print); \
		node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(APPNAME); \
	fi

	@cdk synth --all -c appname=$(APPNAME) -c env=$(ENV) -c schema=$(APPNAME) -c cidr=$(CIDR)

.PHONY: deploy
deploy:
	@export $(shell cat $(ENV_FILE) | xargs)
	@echo "App Name: $(APPNAME)"
	@echo "Env: $(ENV)"
	@echo "Cidr: $(CIDR)"
	@echo "Version: $(VERSION)"
	@amplify push --allow-destructive-graphql-schema-updates -y
	cdk deploy --all c appname=$(APPNAME) -c env=$(ENV) -c schema=$(APPNAME) -c cidr=$(CIDR)
	@amplify codegen

.PHONY: run
run:
	@export $(shell cat $(ENV_FILE) | xargs)
	@echo "App Name: $(APPNAME)"
	@echo "Env: $(ENV)"
	@echo "Cidr: $(CIDR)"
	@echo "Version: $(VERSION)"

	@DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(APPNAME)"
	@export DATABASE_URL
	@npx prisma generate
	@npx prisma db push --accept-data-loss
	@npx vite-node ./gqlserver/server.ts --watch -- --schema prisma/generated/prisma-appsync/schema.gql --handler gqlserver/handler.ts --watchers '[{"watch":["**/*.prisma","*.prisma"],"exec":" npx prisma generate && npx prisma db push --accept-data-loss && touch ./gqlserver/server.ts"}]'

.PHONY: destroy
destroy:
	@export $(shell cat $(ENV_FILE) | xargs)
	@echo "App Name: $(APPNAME)"
	@echo "Env: $(ENV)"
	@echo "Cidr: $(CIDR)"
	@echo "Version: $(VERSION)"

	@cdk destroy --all -c appname=$(APPNAME) -c env=$(ENV) -c schema=$(APPNAME) -c cidr=$(CIDR)
	@amplify delete -y
	@rm -rf amplify
	@rm -rf $(MODULE_PATH)/cdk/lib/amplify-*