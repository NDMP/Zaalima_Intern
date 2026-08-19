import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    skills: {
  type: String,
  default: "",
},

    resume: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },
    interview: {
  scheduled: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
  },

  time: {
    type: String,
    default: "",
  },

  mode: {
    type: String,
    enum: ["Online", "Offline"],
    default: "Online",
  },

  meetLink: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  notes: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: [
      "Scheduled",
      "Completed",
      "Cancelled",
    ],
    default: "Scheduled",
  },
},

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", applicationSchema);