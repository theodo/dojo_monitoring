DATABASE_CONTAINER:=gravity_database
PSQL_USER:=postgres
DOCKER_COMPOSE:=docker-compose

install:
	cd frontend && npm install
	cd frontend && cp .env.template .env
	cd backend && npm install
	cd backend && $(DOCKER_COMPOSE) up -d
	# Waiting for psql to be up
	@cd backend && while !($(DOCKER_COMPOSE) exec $(DATABASE_CONTAINER) psql -U $(PSQL_USER) -c 'SELECT 1;' > /dev/null 2>&1); do echo -n . && sleep 1; done;
	# PSQL Ready
	cd backend && npm run db:reset

.PHONY: install
