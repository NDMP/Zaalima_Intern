import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import api from "../../utils/api";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";  
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";

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
        p: 4,
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  mb={4}
>
  <Avatar
    src={
      user.profileImage
        ? `${IMAGE_URL}/${user.profileImage}`
        : ""
    }
    sx={{
      width: 120,
      height: 120,
      mb: 2,
    }}
  />

  <Button
    component="label"
    variant="outlined"
    startIcon={<CloudUploadIcon />}
  >
    Choose Photo

    <input
      hidden
      type="file"
      accept="image/*"
      onChange={(e) =>
        setProfileImage(
          e.target.files[0]
        )
      }
    />
  </Button>

  <Button
    sx={{ mt: 2 }}
    variant="contained"
    onClick={uploadProfileImage}
  >
    Upload Photo
  </Button>
</Box>
      <Typography variant="h4" fontWeight={700} mb={4}>
        My Profile
      </Typography>
      <Box
  sx={{
    mb: 4,
    mt: 3,
    p: 3,
    bgcolor: "#fff",
    borderRadius: 3,
  }}
>
  <Typography
    fontWeight={700}
    mb={1}
  >
    Profile Completion
  </Typography>

  <LinearProgress
    variant="determinate"
    value={calculateCompletion()}
    sx={{
      height: 10,
      borderRadius: 10,
    }}
  />

  <Typography
    mt={1}
    color="text.secondary"
  >
    {calculateCompletion()}% Completed
  </Typography>
</Box>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
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
            <TextField
              fullWidth
              label="Skills"
              value={user.skills}
              onChange={(e) =>
                setUser({ ...user, skills: e.target.value })
              }
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
    sx={{ mt: 2, ml: 2 }}
    variant="contained"
    onClick={uploadResume}
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
      sx={{ mt: 1, mr: 2 }}
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
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}