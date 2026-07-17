import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

// Load environment variables
dotenv.config();


connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("ATS Backend Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});