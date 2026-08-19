import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import axios from "axios";
import { getToken } from "../../utils/auth";

export default function ApplyJob() {
  const navigate = useNavigate();
const { id } = useParams();

const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  skills: "",
  portfolio: "",
  coverLetter: "",
  agree: false,
  resume: null,
});

  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  useEffect(() => {
  const fetchJob = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJob(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchJob();
}, [id]);

const handleSubmit = async () => {
  if (!job) {
    alert("Job not found.");
    return;
  }

  if (!formData.fullName.trim()) {
    alert("Please enter your full name");
    return;
  }

  if (!formData.email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (!formData.phone.trim()) {
    alert("Please enter your phone number");
    return;
  }

  if (!formData.resume) {
    alert("Please upload your resume");
    return;
  }

  if (!formData.agree) {
    alert("Please accept the terms");
    return;
  }

  try {
    const token = getToken();

    const data = new FormData();

    data.append("job", job._id);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("skills", formData.skills);
    data.append("portfolio", formData.portfolio);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", formData.resume);

    await axios.post(
      "http://localhost:5000/api/applications",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Application Submitted Successfully!");

    navigate("/applicant/my-applications");
  } catch (error) {
    console.error(error);
    alert("Failed to submit application");
  }
};
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Apply for {job?.title || "Job"}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
  <TextField
    fullWidth
    label="Skills"
    name="skills"
    placeholder="e.g. React, Node.js, MongoDB, Express"
    value={formData.skills}
    onChange={handleChange}
  />
</Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              component="label"
              variant="outlined"
            >
              Upload Resume

              <input
                hidden
                type="file"
                name="resume"
                onChange={handleChange}
              />
            </Button>

            {formData.resume && (
              <Typography mt={1}>
                {formData.resume.name}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Cover Letter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Portfolio URL"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agree}
                  name="agree"
                  onChange={handleChange}
                />
              }
              label="I confirm that the information provided is accurate."
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}