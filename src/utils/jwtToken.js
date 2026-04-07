import jwt from "jsonwebtoken";
export const sendToken = (user,statusCode,message,res)=>{
    console.log("user: ",user)
    console.log("jwt secret key: ",process.env.JWT_SECRET_KEY)
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,
        {
        expiresIn:process.env.JWT_EXPIRES_IN,
    });
    console.log("token",token)
    console.log("Secret expires: ", process.env.JWT_EXPIRES_IN)
    res.status(statusCode).cookie("token",token,{
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_IN *24*60*60*1000 ),
        httpOnly:true,
    }).json({
        success:true,
        user,
        message,
        token
    });
    console.log("expires in: ",process.env.COOKIE_EXPIRES_IN)
    console.log("Type: ",typeof process.env.COOKIE_EXPIRES_IN)
}