install:
	cd frontend && npm install
	cd frontend && cp .env.template .env
	cd backend && npm install
	cd backend && docker-compose up -d
	cd backend && npm run db:reset

.PHONY: install
