import express from "express";
import { getAllUsers, deleteUser, dashboardStats } from "../controllers/adminController.js";
import {
  authorizedRoles,
  isAuthenticated,
} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/getallusers",
  isAuthenticated,
  authorizedRoles("Admin"),
  getAllUsers
); // DASHBOARD
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteUser
);

//-/api/admin
router.get(
  "/fetch/dashboard-stats",
  isAuthenticated,
  authorizedRoles("Admin"),
  dashboardStats
);

export default router;