import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const buildUserPayload = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  return user;
};

const getDefaultRoleProfile = (role, extra = {}) => {
  if (role === "recruiter") {
    return {
      recruiterProfile: {
        companyName: extra.companyName || "TalentFlow Labs",
        designation: "Recruiter",
        openJobs: 2,
        applicants: 14,
        aiMatch: 86,
        hired: 1,
        recentApplicants: [
          {
            name: "Rahul Sharma",
            role: "Frontend Developer",
            score: "95%",
            status: "Shortlisted",
          },
          {
            name: "Priya Verma",
            role: "UI/UX Designer",
            score: "92%",
            status: "Interview",
          },
          {
            name: "Aarav Singh",
            role: "Backend Developer",
            score: "88%",
            status: "Review",
          },
        ],
      },
    };
  }

  return {
    applicantProfile: {
      phone: extra.phone || "",
      location: extra.location || "",
      field: "Software Development",
      profileCompletion: 60,
      appliedJobs: 3,
      interviews: 1,
      savedJobs: 5,
      offers: 0,
      aiInsights: [
        "Improve React skills",
        "Add more projects",
        "Profile is 60% complete",
      ],
    },
  };
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName, phone, location } = req.body;
    const normalizedEmail = String(email || "").toLowerCase().trim();
    const normalizedRole = String(role || "").toLowerCase().trim();

    if (!name || !normalizedEmail || !password || !normalizedRole) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required",
      });
    }

    if (!["recruiter", "applicant"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Role must be recruiter or applicant",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);
// Create new user
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,
      ...getDefaultRoleProfile(normalizedRole, {
        companyName,
        phone,
        location,
      }),
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user: buildUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = (email || username || "").trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/username and password are required",
      });
    }

    // Check user exists
    const user = await User.findOne({
      $or: [{ email: String(identifier).toLowerCase() }, { name: identifier }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: buildUserPayload(user),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};