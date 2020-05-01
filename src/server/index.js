import '@babel/polyfill';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import MongoConnect from './mongo';

import * as appRoutes from './routes';
import { logMiddleware, fetchRuntime } from './middleware';
import favicon from 'serve-favicon';
import toDoRouter from './api/todo';

const app = express();
const port = process.env.PORT || '8000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, '../../assets/', 'favicon.ico')));
app.use('/build/web', express.static(path.join(__dirname, '../../build/web')));
app.use(logMiddleware);
app.use(fetchRuntime);
MongoConnect();

const { indexRoute } = appRoutes;

app.use('/rest', toDoRouter);
app.get('/*', indexRoute);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;
