
const jwt  = require('jsonwebtoken')

const auth  = (req,res,next)=>{
    let token = req.header('Authorization');
    if(!token){
        res.status(401).json('Access denied. No token provided.');
    }
    let newtoken = token.slice(7,token.length)
    let decode = jwt.verify(newtoken,"amit")
    req.user = decode
    next()
} 

module.exports = auth