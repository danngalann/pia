build-dev:
	cd client && ${MAKE} build-dev
	cd server && ${MAKE} build
	
build-prod:
	cd client && ${MAKE} build-prod
	cd server && ${MAKE} build

run-dev:
	docker-compose -f docker-compose-dev.yml up

run-prod:
	docker-compose -f docker-compose-prod.yml up -d