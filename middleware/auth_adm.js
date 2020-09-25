module.exports =(req,res,next)=>{
   const isAdmin = res.locals.isAdmin;
    if(isAdmin === "administrator"){
       return next();
    }
    res.status = 401;
    res.send({
        status:401,
        message:"No estas autorizado para el rol de administrador"
    })
}