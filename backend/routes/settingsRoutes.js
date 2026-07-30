import express from "express";
console.log("✅ Settings Routes Loaded");
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getRecruiterSettings,
  updateRecruiterSettings,
  changePassword,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", verifyToken, getRecruiterSettings);

router.put("/", verifyToken, updateRecruiterSettings);
router.put(
  "/change-password",
  verifyToken,
  changePassword
);

export default router;