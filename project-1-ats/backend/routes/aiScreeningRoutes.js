import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAIScreening } from "../controllers/aiScreeningController.js";

const router = express.Router();

router.get("/:jobId", verifyToken, getAIScreening);

export default router;