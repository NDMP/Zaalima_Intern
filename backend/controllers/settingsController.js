import User from "../models/User.js";
import bcrypt from "bcryptjs";
console.log("✅ Settings Controller Loaded");

export const getRecruiterSettings = async (req, res) => {
    console.log("🔥 GET /api/settings called");
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRecruiterSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Recruiter
    if (user.role === "recruiter") {
      const {
        name,
        email,
        companyName,
        designation,
        website,
        address,
        description,
        notifications,
      } = req.body;

      user.name = name;
      user.email = email;

      user.recruiterProfile.companyName = companyName;
      user.recruiterProfile.designation = designation;
      user.recruiterProfile.website = website;
      user.recruiterProfile.address = address;
      user.recruiterProfile.description = description;

      if (notifications) {
        user.recruiterProfile.notifications = notifications;
      }
    }

    // Applicant
    if (user.role === "applicant") {
      user.name = req.body.name || user.name;

      user.applicantProfile.phone = req.body.phone || "";
      user.applicantProfile.location = req.body.location || "";
      user.applicantProfile.bio = req.body.bio || "";
      user.applicantProfile.portfolio = req.body.portfolio || "";
      user.applicantProfile.linkedin = req.body.linkedin || "";
      user.applicantProfile.github = req.body.github || "";
      user.applicantProfile.education = req.body.education || "";
      user.applicantProfile.experience = req.body.experience || "";
      user.applicantProfile.skills = req.body.skills || "";
      user.applicantProfile.resume = req.body.resume || "";
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    user.applicantProfile.resume = req.file.filename;

    await user.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resume: req.file.filename,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const uploadProfileImage = async (req, res) => {
  try {
    console.log(req.file);
console.log(req.body);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    if (user.role === "applicant") {
      user.applicantProfile.profileImage = req.file.filename;
    }

    if (user.role === "recruiter") {
      user.recruiterProfile.profileImage = req.file.filename;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile image uploaded successfully.",
      image: req.file.filename,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};