import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.js"
import database from "../Database/db.js";
import ErrorHandler from "./errorMiddleware.js"

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const{token} = req.cookies
    if(!token){
        return next(new ErrorHandler("please login to accesss",401));
    }
    const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await database.query("SELECT * FROM users WHERE id = $1 LIMIT 1",
        [decoded.id]
    )
    req.user = user.rows[0];
    next();
});
export const authorizedRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            new ErrorHandler(
                `Role:$(req.user.role) is not allowed to access the resource`,
                403
            );
        }
        next();
    };
};
