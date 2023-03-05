const jwt= require('jsonwebtoken');
const SECRET = 'secrethaha';


const fetchuser=async (req,res,next)=>{

    const token=req.header('token')
    console.log('token',token) 
    if(!token){
        return res.status(401).json({error:"Please authenticate using a valid token"})
    }
    try {
        // here user is the employeeId
        const data=jwt.verify(token,SECRET)
        req.user = data.user
        // req.user.type == data.user.type
        
        return next()
    } catch (error) {
        return res.status(401).json({error:"Authenicate using valid token"})
    }
}

module.exports=fetchuser