const jwt= require('jsonwebtoken');
const SECRET = 'secrethaha';


const fetchuser=async (req,res,next)=>{

    const token=req.header('authToken')
    if(!token){
        res.status(401).json({error:"Please authenticate using a valid token"})
    }
    try {
        // here user is the employeeId
        const data=jwt.verify(token,SECRET)
        req.user = data.user
        return next()
    } catch (error) {
        res.status(401).json({error:"Authenicate using valid token"})
    }
}

module.exports=fetchuser