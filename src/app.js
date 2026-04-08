import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
import { createTables } from "./utils/createTables.js";
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import authRouter from "./Routes/authRouter.js"
import productRouter from "./Routes/productRoutes.js"
import adminRouter from "./Routes/adminRouter.js"
import orderRouter from "./Routes/orderRouter.js"

const app = express();
app.use(express.json());

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true 
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    tempFileDir:"./uploads",
    useTempFiles:true,
}));

app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);
app.use("/api/admin",adminRouter);
app.use("/api/order",orderRouter)
//app.use("/api/order",orderRouter)
createTables()
app.use(errorMiddleware);


export default app;