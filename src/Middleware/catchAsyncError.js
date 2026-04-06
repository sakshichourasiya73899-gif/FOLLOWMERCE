import { promiseCallback } from "express-fileupload/lib/utilities"

export function catchAsyncError(func){
    return (req, res, next)=>{
        Promise.resolve(func(req, res, next)).catch(next);

    };
}