import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";


import {
  applyForJob,
  getApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  scheduleInterview,
  getScheduledInterviews,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("resume"), applyForJob);

router.get("/", verifyToken, getApplications);

router.get("/job/:jobId", verifyToken, getApplicationsByJob);

// 👇 Put this here
router.get(
  "/interviews/all",
  verifyToken,
  getScheduledInterviews
);

// Then dynamic routes
router.patch("/:id/status", verifyToken, updateApplicationStatus);

router.put("/:id/interview", verifyToken, scheduleInterview);
export default router;