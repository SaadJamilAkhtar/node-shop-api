const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", 'PUT, POST, DELETE, GET, PATCH');
        return res.status(200).json({});
    }
    next();
}

module.exports = corsMiddleware;