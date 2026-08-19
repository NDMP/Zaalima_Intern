import Job from "../models/Job.js";
import Application from "../models/Application.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { rankApplicants } from "../services/aiScreeningService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.join(__dirname, "..", "uploads");

export const getAIScreening = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "recruiter" ||
      job.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access AI screening results for this job.",
      });
    }

    const applications = await Application.find({ job: jobId });
    const rankedApplications = await rankApplicants({
      applications,
      job,
      getResumePath: (application) => {
        if (!application.resume) {
          return "";
        }

        return path.join(
          uploadsDirectory,
          path.basename(application.resume)
        );
      },
    });

    const candidates = rankedApplications.map(
      ({ application, screening }) => ({
        ...application.toObject(),
        ...screening,
        resumeExtractionError:
          screening.resumeExtractionError ||
          (!application.resume ? "Resume not uploaded." : ""),
      })
    );

    res.json({
      success: true,
      job,
      candidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
