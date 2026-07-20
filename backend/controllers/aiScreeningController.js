import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getAIScreening = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const applications = await Application.find({ job: jobId });

    const requiredSkills = job.skills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim());

    const rankedCandidates = applications.map((application) => {
      const applicantSkills = (application.skills || "")
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim());

      const matchedSkills = requiredSkills.filter((skill) =>
        applicantSkills.includes(skill)
      );

      const matchPercentage =
        requiredSkills.length > 0
          ? Math.round(
              (matchedSkills.length / requiredSkills.length) * 100
            )
          : 0;

      let recommendation = "Weak Match";

      if (matchPercentage >= 80) {
        recommendation = "Strong Match";
      } else if (matchPercentage >= 50) {
        recommendation = "Good Match";
      }

      return {
        ...application.toObject(),
        matchedSkills,
        matchPercentage,
        recommendation,
      };
    });

    rankedCandidates.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );

    res.json({
      success: true,
      job,
      candidates: rankedCandidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};