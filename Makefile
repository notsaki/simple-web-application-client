run:
	docker-compose -f ./docker/docker-compose.yml --env-file ./.env up --remove-orphans

build:
	docker-compose -f ./docker/docker-compose.yml --env-file ./.env build
