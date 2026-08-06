import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import seedInitialUsers from "./config/seedData.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import aiScreeningRoutes from "./routes/aiScreeningRoutes.js";
import aiInterviewRoutes from "./routes/aiInterviewRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

// Load environment variables


const app = express();

// ES Module __dirname Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded resumes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/ai-screening", aiScreeningRoutes);
app.use("/api/ai-interview", aiInterviewRoutes);
app.use("/api/settings", settingsRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("ATS Backend Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedInitialUsers();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server bootstrap failed:", error.message);
    process.exit(1);
  }
};

startServer();