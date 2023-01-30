run_db:
		docker run --name myPostgresDb -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=<password here> -e POSTGRES_DB=postgresDB -d postgres

run_app:
		docker-compose up --build -d