import ErrorHandler from "../Middleware/errorMiddleware.js"
import { catchAsyncError } from "../Middleware/catchAsyncError.js"
import database from "../Database/db.js"
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
import { generateResetPasswordToken } from "../utils/generateResetPassword.js";
import { generateEmailTemplate } from "../utils/generateForgotPasswordEmail.js";
import {sendEmail}  from "../services/sendEmail.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const{name,email,password}=req.body
    if(!name||!email||!password){
        return next(new ErrorHandler("please provide all required fields.",400))
    }
    const isAlreadyRegistered = await database.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    if(isAlreadyRegistered.rows.length>0){
        return next(new ErrorHandler("User already registered with this email.",400));
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await database.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
        [name,email,hashedPassword] //learn more on writing the same kind of queries and how attacker can easiy attack and I gotta protect it
    );
    sendToken(user.rows[0],201,"User Registerred successfully",res)

});
export const login = catchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password"))
    }
    const user = await database.query(`SELECT * FROM users WHERE email=$1`,
        [email]
    )
    if(user.rows.length===0){
        return next(new ErrorHandler("Invalid email or password"))
    }
    const isPasswordMatch = await bcrypt.compare(password,user.rows[0].password)
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",401))
    }
     sendToken(user.rows[0],201,"User logged in successfully",res)
});
export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("token","",{
        expirs:new Date(Date.now()),
        httpOnly:true,
    }).json({
        success:true,
        message:"Logged out successfully",

    })
});
export const getUser = catchAsyncError(async(req,res,next)=>{
    const{user}=req;
    res.status(200).json({
        success:true,
        user,
});

});
export const forgotPassword= catchAsyncError(async(req,res,next)=>{
    const{email}=req.body
    const{frontendUrl}= req.query;
let userResult = await database.query(
    `SELECT * FROM users WHERE email= $1`,
    [email]
);
if(userResult.rows.length===0){
    return next(new ErrorHandler("User not found with this email.",404));
}
const user = userResult.rows[0];
const{hashedToken,resetPasswordExpireTime,resetToken}=generateResetPasswordToken();
await database.query(`UPDATE users SET reset_password_token=$1,reset_password_expires=to_timestamp($2) WHERE email=$3`,
    [hashedToken,resetPasswordExpireTime/1000,email]
);
const resetPasswordUrl = `${frontendUrl}/password/reset/${resetToken}`;
const message = generateEmailTemplate(resetPasswordUrl);
try{
    await sendEmail({
        email:user.email,
        subject:"Flowmerece Password Recovery",
        message
    });
    res.status(200).json({
        successs:true,
        message:`Email Sent to ${user.email}`
    })

}
catch(error){
  await database.query(`UPDATE users SET reset_password_token=NULL,reset_password_expires=NULL WHERE email=$1`,
    [email]
);
return next(new ErrorHandler("Email could not be sent.",500));

}


})

