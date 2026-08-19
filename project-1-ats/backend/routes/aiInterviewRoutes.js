import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  generateQuestions,
  saveInterviewQuestions,
} from "../controllers/aiInterviewController.js";
const router = express.Router();

router.post(
  "/generate",
  verifyToken,
  generateQuestions
);
router.put(
  "/:jobId",
  verifyToken,
  saveInterviewQuestions
);
export default router;