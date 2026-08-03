import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
      trim: true,
    },
    website: {
  type: String,
  default: "",
},

address: {
  type: String,
  default: "",
},

description: {
  type: String,
  default: "",
},

logo: {
  type: String,
  default: "",
},
notifications: {
  emailOnApplication: {
    type: Boolean,
    default: true,
  },
  aiScreeningComplete: {
    type: Boolean,
    default: true,
  },
  interviewReminder: {
    type: Boolean,
    default: true,
  },
  weeklySummary: {
    type: Boolean,
    default: false,
  },
},
    designation: {
      type: String,
      default: "Recruiter",
      trim: true,
    },
    openJobs: {
      type: Number,
      default: 0,
      min: 0,
    },
    applicants: {
      type: Number,
      default: 0,
      min: 0,
    },
    aiMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    hired: {
      type: Number,
      default: 0,
      min: 0,
    },
    recentApplicants: {
      type: [
        {
          name: String,
          role: String,
          score: String,
          status: String,
        },
      ],
      default: [],
    },
  },
  { _id: false }
);

const applicantProfileSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    bio: {
  type: String,
  default: "",
},

portfolio: {
  type: String,
  default: "",
},

linkedin: {
  type: String,
  default: "",
},

github: {
  type: String,
  default: "",
},

education: {
  type: String,
  default: "",
},

experience: {
  type: String,
  default: "",
},

skills: {
  type: String,
  default: "",
},

resume: {
  type: String,
  default: "",
},
    field: {
      type: String,
      default: "Software Development",
      trim: true,
    },
    profileCompletion: {
      type: Number,
      default: 40,
      min: 0,
      max: 100,
    },
    appliedJobs: {
      type: Number,
      default: 0,
      min: 0,
    },
    interviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    savedJobs: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    savedJobIds: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
],
    offers: {
      type: Number,
      default: 0,
      min: 0,
    },
    aiInsights: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true,
    },

    recruiterProfile: {
      type: recruiterProfileSchema,
      default: undefined,
    },

    applicantProfile: {
      type: applicantProfileSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;