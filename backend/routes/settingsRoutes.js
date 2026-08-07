import express from "express";
console.log("✅ Settings Routes Loaded");
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getRecruiterSettings,
  updateRecruiterSettings,
  changePassword,
  uploadResume,
  uploadProfileImage,
} from "../controllers/settingsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getRecruiterSettings);

router.put("/", verifyToken, updateRecruiterSettings);
router.put(
  "/profile-image",
  verifyToken,
  upload.single("profileImage"),
  uploadProfileImage
);
router.put(
  "/resume",
  verifyToken,
  upload.single("resume"),
  uploadResume
);
router.put(
  "/change-password",
  verifyToken,
  changePassword
);

export default router;