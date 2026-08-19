import bcrypt from "bcryptjs";
import User from "../models/User.js";

const dummyUsers = [
  {
    name: "Kamal Recruiter",
    email: "kamal@talentflow.com",
    password: "kamal@123",
    role: "recruiter",
    recruiterProfile: {
      companyName: "TalentFlow Labs",
      designation: "Senior Recruiter",
      openJobs: 6,
      applicants: 38,
      aiMatch: 91,
      hired: 4,
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
  },
  {
    name: "Ankur Applicant",
    email: "ankur@talentflow.com",
    password: "ankur@123",
    role: "applicant",
    applicantProfile: {
      phone: "9999999999",
      location: "Bhopal",
      field: "Automation & Robotics",
      profileCompletion: 82,
      appliedJobs: 12,
      interviews: 3,
      savedJobs: 8,
      offers: 1,
      aiInsights: [
        "Improve React skills",
        "Add more projects",
        "Resume Score: 82/100",
        "Profile is 82% complete",
      ],
    },
  },
];

const seedInitialUsers = async () => {
  for (const user of dummyUsers) {
    const exists = await User.findOne({ email: user.email.toLowerCase() });
    if (exists) {
      const needsRecruiterProfile =
        exists.role === "recruiter" &&
        (!exists.recruiterProfile || !exists.recruiterProfile.companyName);

      const needsApplicantProfile =
        exists.role === "applicant" &&
        (!exists.applicantProfile || !exists.applicantProfile.location);

      if (needsRecruiterProfile || needsApplicantProfile) {
        await User.updateOne(
          { _id: exists._id },
          {
            ...(needsRecruiterProfile ? { recruiterProfile: user.recruiterProfile } : {}),
            ...(needsApplicantProfile ? { applicantProfile: user.applicantProfile } : {}),
          }
        );
      }

      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.create({
      ...user,
      email: user.email.toLowerCase(),
      password: hashedPassword,
    });
  }
};

export default seedInitialUsers;
