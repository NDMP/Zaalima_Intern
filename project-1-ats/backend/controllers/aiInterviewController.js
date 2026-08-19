import { generateInterviewQuestions } from "../services/geminiService.js";

export const generateQuestions = async (req, res) => {
  try {
    const { title, skills, description } = req.body;

    if (!title || !skills) {
      return res.status(400).json({
        success: false,
        message: "Job title and skills are required.",
      });
    }

    const result = await generateInterviewQuestions(
      title,
      skills,
      description || ""
    );

    // Gemini sometimes wraps JSON in ```json ... ```
    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let questions;

    try {
      questions = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response.",
        raw: result,
      });
    }

    res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Job from "../models/Job.js";

export const saveInterviewQuestions = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { questions } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.interviewQuestions = questions;

    await job.save();

    res.json({
      success: true,
      message: "Interview questions saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};