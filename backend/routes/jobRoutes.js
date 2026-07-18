import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";
import { verifyToken, isRecruiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJobs);
router.get("/:id", verifyToken, getJobById);

router.post("/", verifyToken, isRecruiter, createJob);
router.put("/:id", verifyToken, isRecruiter, updateJob);
router.delete("/:id", verifyToken, isRecruiter, deleteJob);

export default router;
