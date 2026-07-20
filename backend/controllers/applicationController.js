import Application from "../models/Application.js";

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const application = await Application.create({
      job: req.body.job,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      skills: req.body.skills,
      portfolio: req.body.portfolio,
      coverLetter: req.body.coverLetter,
      resume: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("job");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get applications for a specific job
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};