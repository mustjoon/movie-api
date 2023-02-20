# Simple api for fetching and creating new movies

## Setup (Tested with NodeJs 18.2.1):

Copy .env.example to .env and .env.docker

### Docker

```
docker-compose build
docker-compose up
```

### Local

Setup MariaDB locally and then run:

```
yarn
yarn start
```

```
yarn
yarn dev
```

## Run seeds

### From local

```
npm install -g sequelize-cli
sequelize db:seed:all
```

### OR Via Docker

#### Get container id

```
docker ps
docker exec <CONTAINER_ID> sequelize db:seed:all

```

### App runs on port 3005

http://localhost:3005
