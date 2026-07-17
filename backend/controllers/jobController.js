import Job from "../models/Job.js";

<<<<<<< HEAD
export const createJob = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    if (!title || !company || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, company, and description are required.",
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
=======
// Create Job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
      success: false,
      message: error.message,
    });
  }
};

<<<<<<< HEAD
export const getJobs = async (req, res) => {
  try {
    const filter = req.user.role === "recruiter" ? { createdBy: req.user.id } : {};

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
=======
// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
      success: false,
      message: error.message,
    });
  }
};
<<<<<<< HEAD
=======

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
