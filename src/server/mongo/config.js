const MongoConfig = () => {
    return {
        host: process.env.MONGO_DB_HOST || 'localhost',
        port: process.env.MONGO_DB_PORT || 27017,
        instance: process.env.MONGO_DB_DATABASE || 'todo',
    };
};

export default MongoConfig();
