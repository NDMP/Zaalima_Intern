import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Autocomplete,
  Link as MuiLink,
} from "@mui/material";
import api from "../../utils/api";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";  
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const skillOptions = [
  "React", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Express",
  "Python", "Java", "C#", ".NET", "ASP.NET", "SQL", "MongoDB", "Git",
  "Figma", "UI/UX Design", "AWS", "Docker", "REST API", "Machine Learning",
];

export default function Profile() {
  const [user, setUser] = useState({
    profileImage: "",
    name: "",
    phone: "",
    location: "",
    bio: "",
    portfolio: "",
    linkedin: "",
    github: "",
    education: "",
    experience: "",
    skills: "",
    resume: "",
  });
  const calculateCompletion = () => {
  const fields = [
    user.name,
    user.phone,
    user.location,
    user.bio,
    user.portfolio,
    user.linkedin,
    user.github,
    user.education,
    user.experience,
    user.skills,
    user.resume,
  ];

  const completed = fields.filter(
    (field) => field && field.trim() !== ""
  ).length;

  return Math.round(
    (completed / fields.length) * 100
  );
};
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const IMAGE_URL = API_URL.replace(
  /\/api\/?$/,
  "/uploads"
);

  const normalizeUrl = (value) => {
    if (!value) return "";
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/settings");

      setUser({
        name: data.user.name || "",
        phone: data.user.applicantProfile.phone || "",
        location: data.user.applicantProfile.location || "",
        profileImage:
        data.user.applicantProfile.profileImage || "",
        bio: data.user.applicantProfile.bio || "",
        portfolio: data.user.applicantProfile.portfolio || "",
        linkedin: data.user.applicantProfile.linkedin || "",
        github: data.user.applicantProfile.github || "",
        education: data.user.applicantProfile.education || "",
        experience: data.user.applicantProfile.experience || "",
        skills: data.user.applicantProfile.skills || "",
        resume: data.user.applicantProfile.resume || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadProfileImage = async () => {
  if (!profileImage) {
    toast.error("Please select an image.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("profileImage", profileImage);

    const res = await api.put(
      "/settings/profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(res.data.message);

    // Get latest user data
    const profile = await api.get("/settings");

    // Update localStorage
    localStorage.setItem(
        "authUser",
      JSON.stringify(profile.data.user)
    );

    // Refresh current page
    fetchProfile();
  } catch (err) {
    console.log(err);
    toast.error("Upload failed.");
  }
};
  const uploadResume = async () => {
  if (!resumeFile) {
    toast.error("Please select a resume.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    const res = await api.put(
      "/settings/resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(res.data.message);

    fetchProfile();
  } catch (err) {
    console.log(err);
    toast.error("Resume upload failed.");
  }
};

  const saveProfile = async () => {
    try {
      await api.put("/settings", user);

      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ color: "#0F172A", fontWeight: 800, mb: 3 }}>
        My Profile
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: { xs: 2.5, sm: 3 }, height: "100%", borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)", transition: "border-color 180ms ease, box-shadow 180ms ease", "&:hover": { borderColor: "#BFDBFE", boxShadow: "0 8px 20px rgba(15,23,42,.08)" } }}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#0F172A", fontWeight: 800, mb: 2 }}><PhotoCameraIcon sx={{ color: "#2563EB" }} /> Profile Photo</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, flexWrap: "wrap" }}>
              <Avatar
                src={user.profileImage ? `${IMAGE_URL}/${user.profileImage}` : ""}
                sx={{ width: 96, height: 96, bgcolor: "#DBEAFE", color: "#2563EB", fontSize: 30, fontWeight: 700 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, flex: 1, minWidth: 160 }}>
                <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ minHeight: 44, borderColor: "#2563EB", color: "#2563EB", fontWeight: 700, borderRadius: 2, "&:hover": { borderColor: "#1D4ED8", bgcolor: "#EFF6FF" } }}>
                  Choose Photo
                  <input hidden type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
                </Button>
                <Button variant="contained" onClick={uploadProfileImage} sx={{ minHeight: 44, bgcolor: "#2563EB", fontWeight: 700, borderRadius: 2, "&:hover": { bgcolor: "#1D4ED8" } }}>
                  Upload Photo
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: { xs: 2.5, sm: 3 }, height: "100%", borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)", transition: "border-color 180ms ease, box-shadow 180ms ease", "&:hover": { borderColor: "#BFDBFE", boxShadow: "0 8px 20px rgba(15,23,42,.08)" } }}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#0F172A", fontWeight: 800, mb: 1.5 }}><TaskAltIcon sx={{ color: "#2563EB" }} /> Profile Completion</Typography>
            <LinearProgress variant="determinate" value={calculateCompletion()} sx={{ height: 10, borderRadius: 10, bgcolor: "#E2E8F0", "& .MuiLinearProgress-bar": { bgcolor: "#2563EB", borderRadius: 10 } }} />
            <Typography mt={1.25} color="text.secondary">{calculateCompletion()}% Completed</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,.04)", transition: "border-color 180ms ease, box-shadow 180ms ease", "&:hover": { borderColor: "#BFDBFE", boxShadow: "0 8px 20px rgba(15,23,42,.08)" } }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2, borderRadius: 2, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              {["portfolio", "linkedin", "github"].map((key) => user[key] && (
                <MuiLink key={key} href={normalizeUrl(user[key])} target="_blank" rel="noreferrer" sx={{ color: "#2563EB", fontWeight: 700, overflowWrap: "anywhere" }}>
                  {key === "linkedin" ? "LinkedIn" : key[0].toUpperCase() + key.slice(1)} -&gt;
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              value={user.phone}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Location"
              value={user.location}
              onChange={(e) =>
                setUser({ ...user, location: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bio"
              value={user.bio}
              onChange={(e) =>
                setUser({ ...user, bio: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Portfolio"
              value={user.portfolio}
              onChange={(e) =>
                setUser({ ...user, portfolio: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={user.linkedin}
              onChange={(e) =>
                setUser({ ...user, linkedin: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="GitHub"
              value={user.github}
              onChange={(e) =>
                setUser({ ...user, github: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              multiple
              freeSolo
              options={skillOptions}
              value={user.skills.split(",").map((skill) => skill.trim()).filter(Boolean)}
              onChange={(_, values) => setUser({ ...user, skills: values.join(", ") })}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} fullWidth label="Skills" placeholder="Type a skill and choose an option" />}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Education"
              value={user.education}
              onChange={(e) =>
                setUser({ ...user, education: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Experience"
              value={user.experience}
              onChange={(e) =>
                setUser({ ...user, experience: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box>
  <Button
    variant="outlined"
    component="label"
    startIcon={<CloudUploadIcon />}
    sx={{ borderColor: "#2563EB", color: "#2563EB", fontWeight: 700, borderRadius: 2 }}
  >
    Choose Resume

    <input
      hidden
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={(e) =>
        setResumeFile(e.target.files[0])
      }
    />
  </Button>

  {resumeFile && (
    <Typography mt={1}>
      {resumeFile.name}
    </Typography>
  )}

  <Button
    variant="contained"
    onClick={uploadResume}
    sx={{ mt: 2, ml: { xs: 0, sm: 2 }, bgcolor: "#2563EB", fontWeight: 700, borderRadius: 2, "&:hover": { bgcolor: "#1D4ED8" } }}
  >
    Upload Resume
  </Button>

  {user.resume && (
  <Box mt={2}>
    <Typography fontWeight={600}>
      Current Resume
    </Typography>

    <Button
      href={`http://localhost:5000/uploads/${user.resume}`}
      target="_blank"
      variant="outlined"
      sx={{ mt: 1, mr: 2, borderColor: "#2563EB", color: "#2563EB", fontWeight: 700 }}
    >
      View Resume
    </Button>

    <Button
      href={`http://localhost:5000/uploads/${user.resume}`}
      download
      variant="contained"
      sx={{ mt: 1 }}
    >
      Download Resume
    </Button>
  </Box>
)}
</Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={saveProfile}
              sx={{ minHeight: 46, px: 3, bgcolor: "#2563EB", fontWeight: 700, borderRadius: 2, "&:hover": { bgcolor: "#1D4ED8" } }}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
