const jwt =require('jsonwebtoken');
const config =require('../config');
const sendError = (res) =>{
    res.status = 401;
    res.send({
        status:401,
        massage:"no estas autorizado"
    })  
}
module.exports =(req,res,next)=>{
    const authHeader =req.headers.authorization;
    
     if(!authHeader){
        sendError(res);
     }
    const token = authHeader && authHeader.split(' ')[1]; 
    
    
    const authData = jwt.verify(token, config.firm);
    //if is admin
    res.locals.isAdmin = authData.role;
    if(authData){
        
        return next();
    }
    sendError(res)
}

