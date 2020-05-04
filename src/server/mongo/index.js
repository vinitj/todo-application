import mongoose from 'mongoose';
import config from './config';

const MongoConnect = async () => {
    const db = mongoose.connection;
    let mongoDB;

    db.on('error', (err) => {
        console.error('Unable to connect to Mongo', err);
    });
    db.once('open', () => {
        mongoDB = db;
    });

    await mongoose.connect(
        `mongodb://${config.host}:${config.port}/${config.instance}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
            socketTimeoutMS: 480000,
            keepAlive: 300000,
            useFindAndModify: false,
        },
    );

    mongoDB.on('disconnected', () => {
        console.error('[CRITICAL] Mongo got disconnected ');
    });
    mongoDB.on('connected', () => {
        console.error('Mongo got Connected back successfully ');
    });
    mongoDB.on('close', () => {
        console.error('[CRITICAL] Connection Closed');
    });
    mongoDB.on('reconnected', () => {
        console.error('Mongo got reconnected back successfully ');
    });
};

export default MongoConnect;
