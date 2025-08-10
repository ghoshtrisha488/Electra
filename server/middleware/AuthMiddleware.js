const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=> {
    const authheader = req.headers.authorization;
    if(!authheader) return res.status(401).json({error:'no token provided'});
    const token = authheader.split('')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch{
        res.status(401).json({error:'invalid token'});
    }
}