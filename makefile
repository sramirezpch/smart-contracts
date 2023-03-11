HARDHAT_IMAGE_NAME="hardhat-node"
HARDHAT_DOCKERFILE="./infra/.dockerfile"

COMPOSE_FILE="./docker-compose.yml"

run-app: clean
	docker-compose -f $(COMPOSE_FILE) up -d --build

.PHONY: clean
clean:
	docker-compose -f $(COMPOSE_FILE) down --remove-orphans

open-browser:
ifeq ($(OS), Windows_NT)
	start "$(CLIENT_LOCAL_URL)"
else
	open $(CLIENT_LOCAL_URL)
endif

deployment:
	npx hardhat run ./scripts/deploy.ts --network $(if $(network),$(network),localhost)

run-node:
	npx hardhat node