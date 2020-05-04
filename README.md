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

\*\*Each folder within client can act as separate app and can be ssred or not based on loadable component parameter ({ssr: false}) and not passing fetchData respectively.

Above is pretty cool in the sense that each app can have its own layout, routes etc without interfering with others. (Just need to add an entry in webpack config to support multiple apps)
Code splitting within app works automagically without making any webpack related changes

### Docker

Todo is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080 (via `.env` file), so change this within the `.env` if necessary. When ready, simply use the Dockerfile to build the image.

_For development environment use -_

```sh
cd todo
docker-compose up webdev
```

This will by default support hot reloading via nodemon and webpack. Also mongodb default data path is /data/docker-mongodb. Feel free to change it in docker-compose.yml

This also supports remote debugging via vscode (Attach to Todo Application Attach)

If somehow container unable to build use
`docker-compose up --build webdev`

_for prod environment use -_

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

```code
docker pull <Docker Hub Id>/sample-todo:latest
```

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

#### Kubernetes + Kompose

#####Change env port to something else as 8080 is used by kubectl

Use file docker-compose-dev.yml for kompose deplpyment

```sh
mkdir kubedir
kompose --file docker-compose-dev.yml convert -o kubedir
kubectl apply -f kubedir/
```

```sh
kubectl get all
```

Get all will return pods, svc,deployment etc. To check for logs
`kubectl logs pod/*` from above command

#####Kompose expects kubectl to be listening on port 8080. So run `kubectl proxy --port=8080 &` and leave that running in background

for cleanup just do

```sh
kompose --file docker-compose-dev.yml down
kubectl delete all --all
```

if for some reason kompose up failed due to configmap check in kubernetes

```sh
kubectl get configmap # get Name and delete from next command
kubectl delete configmap env
```

### Todos

-   Write Tests

## License

MIT
