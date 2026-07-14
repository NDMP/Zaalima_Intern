import { useState, useContext } from "react";
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

import { ApplicationContext } from "../../context/ApplicationContext";
import { JobContext } from "../../context/JobContext";

export default function ApplyJob() {
  const { applications, setApplications } = useContext(ApplicationContext);
  const { jobs } = useContext(JobContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const job = jobs.find((j) => String(j.id) === id);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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

  const handleSubmit = () => {
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

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      portfolio: formData.portfolio,
      coverLetter: formData.coverLetter,
      resume: formData.resume.name,
      status: "Under Review",
      appliedOn: new Date().toLocaleDateString(),
    };

    setApplications([...applications, newApplication]);

    alert("Application Submitted Successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolio: "",
      coverLetter: "",
      agree: false,
      resume: null,
    });

    navigate("/applicant/my-applications");
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