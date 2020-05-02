import mongoose from 'mongoose';
import config from './config';
let _db;

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
        console.log('[CRITICAL] Mongo got disconnected ');
    });
    mongoDB.on('connected', () => {
        console.log('Mongo got Connected back successfully ');
    });
    mongoDB.on('close', () => {
        console.log('[CRITICAL] Connection Closed');
    });
    mongoDB.on('reconnected', () => {
        console.log('Mongo got reconnected back successfully ');
    });
};

export default MongoConnect;
