import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
config({path:"./Config/Config.env"});
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


export default app;