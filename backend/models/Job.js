import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);