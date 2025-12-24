build:
	docker-compose build

run:
	docker-compose up -d --build

stop:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker system prune -f
