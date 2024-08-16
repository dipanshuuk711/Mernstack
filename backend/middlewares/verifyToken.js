const jwt = require('jsonwebtoken')

// verifyToken
//This part should be fixed 
const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: "Not authorised. No token"})

        //This part
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err,data)  => {
                if(err){
                    return res.status(403).json({msg: "Wrong or expired token."})} 
                    else{
                        req.user = data 
                        next();
                    }
                })
            }
       }


// verifyTokenAdmin
const verifyTokenAdmin = (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: "Not authorised. No token"})

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err,data)  => {
                if(err) return res.status(403).json({msg: "Wrong or expired toeken."})
                    else{
                        // data = {id: user._id, isAdmin: user.isAdmin}
                        if(!data.isAdmin) return res.status(403).json({msg: "You are not admin"})
                        req.user = data
                        next()
                    }
                })
            }
        }


    module.exports = {
        verifyToken,
        verifyTokenAdmin
    }