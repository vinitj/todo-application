import fetchPolyfill from './runtime/fetch';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../../access.log'),
    { flags: 'a' },
);

export const logMiddleware = morgan('combined', { stream: accessLogStream });

export const fetchRuntime = function (req, res, next) {
    fetchPolyfill(req);
    next();
};
