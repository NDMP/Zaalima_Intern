import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { verifyToken, isRecruiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJobs);
router.post("/", verifyToken, isRecruiter, createJob);

export default router;
