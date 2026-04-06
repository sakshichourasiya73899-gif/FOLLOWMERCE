class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode= statusCode;
        
    }

}
export const errorMiddleware= (err, req, res, next)=>{
   err.message = err.message || "Internal Server Error";
    err.statusCode= err.statusCode || 500;
    if(err.code===11000){
        const message= `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        err= new ErrorHandler(message, 400);
    }
    if(err.name = "JsonWebTokenError"){
        err= new ErrorHandler("Invalid token, please login again", 401);
    }
    if(err.name === "TokenExpiredError"){
        const message= "Token expired, please login again";
        err= new ErrorHandler("Token expired, please login again", 401);
    }
    console.error(err);
    const errorMessage = err.errors? Object.values(err.errors)
    .map((val) => val.message)
    .join(", "): err.message;
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
};
export default ErrorHandler;