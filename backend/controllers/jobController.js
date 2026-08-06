import Job from "../models/Job.js";
import User from "../models/User.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      employmentType,
      experience,
      vacancies,
      minSalary,
      maxSalary,
      skills,
      description,
      requirements,
      benefits,
      deadline,
      workMode,
      aiScreening,
    } = req.body;

    if (!title || !company || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, company, and description are required.",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      employmentType,
      experience,
      vacancies,
      minSalary,
      maxSalary,
      skills,
      description,
      requirements,
      benefits,
      deadline,
      workMode,
      aiScreening,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
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
      success: false,
      message: error.message,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.applicantProfile.savedJobIds.includes(req.params.id)) {
      user.applicantProfile.savedJobIds.push(req.params.id);
      user.applicantProfile.savedJobs =
        user.applicantProfile.savedJobIds.length;

      await user.save();
    }

    res.json({
      success: true,
      message: "Job saved successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const removeSavedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.applicantProfile.savedJobIds =
      user.applicantProfile.savedJobIds.filter(
        (job) => job.toString() !== req.params.id
      );

    user.applicantProfile.savedJobs =
      user.applicantProfile.savedJobIds.length;

    await user.save();

    res.json({
      success: true,
      message: "Saved job removed.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "applicantProfile.savedJobIds"
    );

    res.json({
      success: true,
      jobs: user.applicantProfile.savedJobIds,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};