import '@babel/polyfill';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import MongoConnect from './mongo';
import * as appRoutes from './routes';
import { logMiddleware, fetchRuntime } from './middleware';
import toDoRouter from './api/todo';

import config from '../../webpack.config';

const app = express();
const port = process.env.WEBAPP_PORT || '8000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, '../../assets/', 'favicon.ico')));
app.use('/build/web', express.static(path.join(__dirname, '../../build/web')));
app.use(logMiddleware);
app.use(fetchRuntime);
MongoConnect();

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            logLevel: 'silent',
            publicPath: '/build/web',
            writeToDisk(filePath) {
                return (
                    /build\/node\//.test(filePath) ||
                    /loadable-stats/.test(filePath)
                );
            },
        }),
    );
}

const { indexRoute } = appRoutes;

app.use('/rest', toDoRouter);
app.get('/*', indexRoute);

const server = app.listen(port, () => {
    console.info(`Listening to requests on http://localhost:${port}`);
});

const shutdownProcess = (cb) => {
    server.close(function () {
        console.info('Http server closed.');
        mongoose.connection.close(false, () => {
            console.info('MongoDb connection closed.');
            cb();
        });
    });
};

process.on('SIGINT', function () {
    console.error('SIGINT signal received.');
    shutdownProcess(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.error('SIGTERM signal received.');
    shutdownProcess(() => {
        process.exit(0);
    });
});

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
        shutdownProcess(() => {
            process.exit(0);
        });
    })
    .on('uncaughtException', (err) => {
        console.error(err, 'Uncaught Exception thrown');
        shutdownProcess(() => {
            process.exit(0);
        });
    });
module.exports = app;
