import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    interviewQuestions: {
  technical: [String],
  coding: [String],
  behavioral: [String],
  hr: [String],
},

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    employmentType: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    minSalary: {
      type: Number,
      default: 0,
    },

    maxSalary: {
      type: Number,
      default: 0,
    },

    skills: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      default: "",
    },

    benefits: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
    },

    workMode: {
      type: String,
      default: "",
    },

    aiScreening: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);