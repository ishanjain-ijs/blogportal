const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    try{
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decode.username
        next();
    }catch(error){
        res.status(401).json({
            error:"Invalid Token"
        })
    }
}


module.exports = verifyJWT