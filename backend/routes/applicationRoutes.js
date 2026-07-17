import express from "express";

import {
  applyForJob,
  getApplications,
  getApplicationsByJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

// Apply for a job
router.post("/", applyForJob);

// Get all applications
router.get("/", getApplications);

// Get applications for a specific job
router.get("/job/:jobId", getApplicationsByJob);

// Update application status
router.patch("/:id/status", updateApplicationStatus);

export default router;