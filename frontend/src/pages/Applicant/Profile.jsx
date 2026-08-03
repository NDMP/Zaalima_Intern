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

export default function Profile() {
  const [user, setUser] = useState({
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
      <Typography variant="h4" fontWeight={700} mb={4}>
        My Profile
      </Typography>

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
            <TextField
              fullWidth
              label="Resume Link"
              value={user.resume}
              onChange={(e) =>
                setUser({ ...user, resume: e.target.value })
              }
            />
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