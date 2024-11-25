const jwt=require('jsonwebtoken');

const generateJwtToken=(userData)=>{
    return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:400000})

}
const validateJwtToken=(req,res,next)=>{
    const tokenCheck=req.headers.authorization;
    if(!tokenCheck) return res.status(401).json
    ({err:'TOKEN NOT AVAILABLE'});
    const token=req.headers.authorization
    split(' ')[1];
    if(!token){
        return res.status(401).json({err:'INVALID TOKEN'});
    }
    try{
        const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=validateToken;
        next();
    }catch(err){
        return res.status(401).json(err.messege);
    }
    



}
module.exports={generateJwtToken,validateJwtToken};