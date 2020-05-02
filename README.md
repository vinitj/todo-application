# TODO Application

Todo application is a express based application which connects to MongoDB for creating/updating and deleting todos. It supports SSR by default. SSR supported features :-

-   CSS in JS via emotion
-   Material UI
-   Code Splitting
-   React Router with Data

### Tech

Todo Application uses a number of open source projects to work properly:

-   [React] - Do i need to mention anything :)!
-   [Express] - Node server
-   [MongoDB] - Database to store todos
-   [Webpack/loadable Components] - For bundling and code splitting
-   [Material UI] - For UI components
-   [Emotion] - CSS in JS based framework for custom css/styles

### Installation

Todo requires [Node.js](https://nodejs.org/) v12+ to run and [mongodb](https://docs.mongodb.com/guides/server/install/).

Install the dependencies and devDependencies and start the server.

```sh
$ cd todo
$ yarn install
$ yarn build:dev
$ yarn start
```

For production environments...

```sh
$ yarn install
$ yarn build:prod
$ yarn start:prod

```

### Development

Todo uses Nodemon + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

### Docker

Todo is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080 (via `.env` file), so change this within the `.env` if necessary. When ready, simply use the Dockerfile to build the image.

For development environment use -

```sh
cd todo
docker-compose up webdev
```

This will by default support hot reloading via nodemon and webpack. Also mongodb default data path is /data/docker-mongodb. Feel free to change it in docker-compose.yml

for prod environment use

```sh
docker-compose up webprod
```

The images exists in docker hub too under project sample_todo

To push any image please do the following

```sh
docker tag todo-application:latest <Docker Hub Id>/sample-todo:latest
docker push <Docker Hub Id>/sample-todo:latest
```

where `todo-application` is the image name (docker image ls)
`sample-todo` is the repo name under dockhub
and latest are the tagnames (need not be same for image and repo)

#### Docker Hub image pull and run

First create a network, pull mongo image, start it in detach mode and bind volume
then run todo application with same network

```sh
docker network create --driver=bridge mongo-net
docker run -d --network mongo-net -p 27017:27017 --name mongo --mount type=bind,src=/data/docker-mongodb/,target=/data/db mongo:3
docker run --network mongo-net -p 8080:8080 --env-file ./.env todo-application
```

Other option (without creating network)

```sh
docker run -d -p 27017:27017 --name mongo --mount type=bind,src=/data/docker-mongodb/,target=/data/db mongo:3
docker run  -p 8080:8080 --env-file ./.env --link mongo:mongo todo-application
```

But in above case change MONGO_DB_HOST (env file) value to container IP which can be found via `docker inspect mongo | grep IPAddress`

#### Kubernetes + Google Cloud

Will add todo with kubernetes

### Todos

-   Write Tests

## License

MIT
