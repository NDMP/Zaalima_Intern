import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Invalid token.",
    });
  }
};

export const isRecruiter = (req, res, next) => {
  if (req.user?.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Recruiter role required.",
    });
  }

  next();
};

export const isApplicant = (req, res, next) => {
  if (req.user?.role !== "applicant") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Applicant role required.",
    });
  }

  next();
};
