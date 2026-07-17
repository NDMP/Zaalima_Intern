import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
<<<<<<< HEAD
=======

>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
    company: {
      type: String,
      required: true,
      trim: true,
    },
<<<<<<< HEAD
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
=======

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    minSalary: {
      type: Number,
    },

    maxSalary: {
      type: Number,
    },

    skills: {
      type: String,
    },

    description: {
      type: String,
    },

    requirements: {
      type: String,
    },

    benefits: {
      type: String,
    },

    deadline: {
      type: Date,
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
    },

    aiScreening: {
      type: Boolean,
      default: true,
    },
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
const Job = mongoose.model("Job", jobSchema);

export default Job;
=======
export default mongoose.model("Job", jobSchema);
>>>>>>> b8df5eb263bc060dcefba1a7a908b67a8d562002
