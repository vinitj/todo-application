const MongoConfig = (env) => {
    if (env === 'production') {
        return {
            host: 'localhost',
            port: 27017,
            instance: 'prod_todo',
        };
    }
    return {
        host: 'localhost',
        port: 27017,
        instance: 'todo',
    };
};

export default MongoConfig(process.env.NODE_ENV);
