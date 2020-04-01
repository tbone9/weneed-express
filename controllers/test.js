const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post Created',
                authData
            });
        }
    });
});

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     // res.send(token)
//     if(typeof bearerHeader !== 'undefined'){
//         //split at the bearer space
//         const bearer = bearerHeader.split(' ');
//         //get token from array
//         const bearerToken = bearer[1];
//         //set the token
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }

// }

module.exports = router;