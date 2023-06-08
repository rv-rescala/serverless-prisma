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

	@cp user/prisma/shcema.prisma prisma/schema.prisma
	@cp user/amplify/schema.gql amplify/backend/api/$(APPNAME)/schema.graphql

	@npx prisma generate
	@amplify export --out $(MODULE_PATH)/cdk/lib/ -y

	@rm .env
	@rm $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	@rm $(MODULE_PATH)/docker/.env.local
	@echo "CREATE SCHEMA $(APPNAME);" > $(MODULE_PATH)/docker/scripts/initdb/01_init_schema_and_tables.sql
	@echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(APPNAME)\"" > $(MODULE_PATH)/docker/.env.local
	@tsc $(MODULE_PATH)/scripts/mergeGraphqlSchema.ts
	@node $(MODULE_PATH)/scripts/mergeGraphqlSchema.js $(MODULE_PATH) $(APPNAME)
	@echo "DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$(APPNAME)?schema=$(APPNAME)"" >> .env

	@docker-compose -f $(MODULE_PATH)/docker-compose.yaml up -d

	@if [ "$(VERSION)" = "init" ]; then \
		npx prisma migrate reset; \
		rm -rf prisma/migrations; \
	fi; \
	@echo "Version: $(VERSION)"
	npx prisma migrate dev --name $(VERSION)

	@find prisma/migrations -type d -name "*$(VERSION)*" -print
	@find prisma/migrations -type d -name "*$(VERSION)*" -exec rm -rf {} \;

	@migration_path=$$(find prisma/migrations -type d -name "*$(VERSION)*" -print); \
	tsc $(MODULE_PATH)/scripts/createMigrateSQL.ts; \
	if [ "$(VERSION)" = "init" ]; then \
		node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(APPNAME) 1; \
	else \
		node $(MODULE_PATH)/scripts/createMigrateSQL.js $$migration_path $(APPNAME); \
	fi

	@cdk synth --all -c appname=$(APPNAME) -c env=$(ENV) -c schema=$(APPNAME) -c cidr=$(CIDR)