
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET= process.env.JWT_SECRET|| "SKSKHJHJDFGHUFIDBUDDNIFDMFDOPMOUIODHJDKHJDKHDKFH";

exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}= req.cookies;
    if(!token){
        return next("Please Login to access this resource",401)
    }
    const decodedData=jwt.verify(token,JWT_SECRET);
    req.user= await User.findById(decodedData.id);
    next();
};

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(
                `Role: ${req.user.role} is not allow to access this resource`,403
                
            );
           
        };
        next();
       
        
    };
};