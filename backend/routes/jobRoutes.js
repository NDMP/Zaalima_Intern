import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
  saveJob,
removeSavedJob,
getSavedJobs,
} from "../controllers/jobController.js";
import { verifyToken, isRecruiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJobs);
router.get("/:id", verifyToken, getJobById);

router.post("/", verifyToken, isRecruiter, createJob);
// Get all saved jobs
router.get(
  "/saved",
  verifyToken,
  getSavedJobs
);

// Save a job
router.post(
  "/:id/save",
  verifyToken,
  saveJob
);

// Remove saved job
router.delete(
  "/:id/save",
  verifyToken,
  removeSavedJob
);
router.put("/:id", verifyToken, isRecruiter, updateJob);
router.delete("/:id", verifyToken, isRecruiter, deleteJob);

export default router;
