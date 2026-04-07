import express from "express"
import { register,login,logout,getUser, forgotPassword, resetPassword, updatedPassword, updateProfile } from "../controllers/authController.js";
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
/*@API-/api/auth/password/forgot */
router.post("/password/forgot",forgotPassword)
/*@API-/api/auth/password/reset/:token*/
router.put("/password/reset/:token",resetPassword)
/*@API-/api/auth/password/update*/
router.put("/password/update",isAuthenticated,updatedPassword)
/*@API-/api/auth/profile/update*/
router.put("/profile/update",isAuthenticated,updateProfile)

export default router;