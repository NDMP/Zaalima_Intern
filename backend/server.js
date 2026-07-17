import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import seedInitialUsers from "./config/seedData.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("ATS Backend Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await seedInitialUsers();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server bootstrap failed:", error.message);
        process.exit(1);
    }
};

startServer();