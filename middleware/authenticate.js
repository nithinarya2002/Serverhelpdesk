const jwt=require('jsonwebtoken');
const User=require('../model/userSchema')

const Authenticate=async (req,res,next)=>{
    try {
        const token=req.cookies.newcook;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyToken);
        const rootUser=await User.findOne({_id:verifyToken._id,'tokens.token':token});
        if(!rootUser){
            throw new Error('User Not Found');
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    } catch (error) {
        res.status(401).json({message:'Unauthorised: no token provided'});
        console.log(error);
    }
}
module.exports=Authenticate;