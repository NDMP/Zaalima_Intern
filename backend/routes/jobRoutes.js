import express from "express";
import {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";
import { verifyToken, isRecruiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJobs);
router.post("/", verifyToken, isRecruiter, createJob);
router.delete("/:id", verifyToken, isRecruiter, deleteJob);
router.put("/:id", verifyToken, isRecruiter, updateJob);
export default router;
