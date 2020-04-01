const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // res.send(token)
    if(typeof bearerHeader !== 'undefined'){
        //split at the bearer space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

