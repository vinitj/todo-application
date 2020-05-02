FROM node:12-stretch as build
WORKDIR /home/node/build
COPY package.json yarn.lock ./
RUN yarn install
COPY src src
COPY . .


FROM node:12-alpine as dev
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=build --chown=node:node /home/node/build .
ENV PATH=$PATH:/home/node/app/node_modules/.bin/
RUN yarn build:dev
CMD [ "./node_modules/.bin/nodemon", "src/server/index.js"]


FROM node:12-alpine as prod
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=build --chown=node:node /home/node/build .
RUN yarn compile
RUN yarn build:prod
CMD [ "node", "dist/server/index.js"]


