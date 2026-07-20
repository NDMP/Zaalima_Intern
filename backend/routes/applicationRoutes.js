import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  applyForJob,
  getApplications,
  getApplicationsByJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("resume"),
  applyForJob
);

router.get("/", verifyToken, getApplications);

router.get("/job/:jobId", verifyToken, getApplicationsByJob);

router.patch("/:id/status", verifyToken, updateApplicationStatus);

export default router;