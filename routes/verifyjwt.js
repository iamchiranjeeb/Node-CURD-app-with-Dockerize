const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['access-token']
    if (!token){
        return res.send("Access Denied");
    }
    try {
        const verify = jwt.verify(token,process.env.secretKey);
        req.user = verify;
        next();
    }catch(err){
        res.status(401).send("Invalid Access Token")
    }
}

module.exports = verifyToken;