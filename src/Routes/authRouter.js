import express from "express"
import { register,login,logout,getUser } from "../controllers/authController.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";

const router = express.Router();
/*@API- /api/auth/register*/
router.post("/register",register)
/*@API - /api/auth/login*/
router.post("/login",login)
/*@API-/api/auth/logout*/
router.get("/logout",isAuthenticated,logout)
/*@API-/api/auth/getUser*/
router.get("/me",isAuthenticated,getUser)

export default router;