const logMiddleware = function(req, res, next) {
    console.log('The request received ', req.url);
    if (req.body) {
        console.log('Body Parameters are', req.body);
    }
    next();
}

export default logMiddleware