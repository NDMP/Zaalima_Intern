import express from "express";
<<<<<<< HEAD
import { createJob, getJobs } from "../controllers/jobController.js";
import { verifyToken, isRecruiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJobs);
router.post("/", verifyToken, isRecruiter, createJob);

export default router;
=======

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Create Job
router.post("/", createJob);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

export default router;
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
