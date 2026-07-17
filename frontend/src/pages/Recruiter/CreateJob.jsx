import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import { useContext } from "react";
import { JobContext } from "../../context/JobContext";
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";
import api from "../../utils/api";
//import axios from "axios";


import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

export default function CreateJob() { 
  const initialJobData = {
  title: "",
  company: "",
  location: "",
  employmentType: "",
  experience: "",
  vacancies: "",
  minSalary: "",
  maxSalary: "",
  skills: "",
  description: "",
  requirements: "",
  benefits: "",
  deadline: "",
  workMode: "",
  aiScreening: true,
};
    const [jobData, setJobData] = useState(initialJobData); 
const {
  editingJob,
  setEditingJob,
} = useContext(JobContext);
const navigate = useNavigate(); 
const handleChange = (event) => {
  const { name, value, type, checked } = event.target;

  setJobData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
useEffect(() => {
  if (editingJob) {
    setJobData(editingJob);
  }
}, [editingJob]);
const handleSubmit = async () => {
  if (!jobData.title.trim()) {
    alert("Job Title is required");
    return;
  }

  if (!jobData.company.trim()) {
    alert("Company Name is required");
    return;
  }

  if (!jobData.location.trim()) {
    alert("Location is required");
    return;
  }

  try {
    if (editingJob) {
      await api.put(
        `/jobs/${editingJob._id}`,
        jobData
      );

        {/* await axios.put(
        `http://localhost:5000/api/jobs/${editingJob._id}`,
        jobData
      );
      */}

      alert("Job Updated Successfully!");
      setEditingJob(null);
    } else {
      
      await api.post(
        "/jobs",
        jobData
      );
        {/* 
      await axios.post(
        "http://localhost:5000/api/jobs",
        jobData
      );
      */}

      alert("Job Published Successfully!");
    }

    setJobData(initialJobData);

    navigate("/recruiter/jobs");
  } catch (error) {
  console.error(error);
  console.error(error.response);

  alert(error.response?.data?.message || error.message);
}
};
  return (
    <>
      <Sidebar />
      <Topbar />

      <Box
  sx={{
    ml: "260px",
    mt: "72px",
    p: 4,
    width: "calc(100% - 260px)",
    boxSizing: "border-box",
  }}
>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Create New Job
        </Typography>

        <Paper
  sx={{
    p: 4,
    borderRadius: 4,
    maxWidth: 1100,
    mx: "auto",
  }}
>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
  fullWidth
  label="Job Title"
  placeholder="Frontend Developer"
  name="title"
  value={jobData.title}
  onChange={handleChange}
/>
            </Grid>

            <Grid item xs={12}>
              <TextField
  fullWidth
  label="Company Name"
  placeholder="TalentFlow Technologies"
  name="company"
  value={jobData.company}
  onChange={handleChange}
/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  label="Location"
  placeholder="Delhi"
  name="location"
  value={jobData.location}
  onChange={handleChange}
/>
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField
  select
  fullWidth
  label="Employment Type"
  name="employmentType"
  value={jobData.employmentType}
  onChange={handleChange}
>
  <MenuItem value="Full Time">Full Time</MenuItem>
  <MenuItem value="Part Time">Part Time</MenuItem>
  <MenuItem value="Internship">Internship</MenuItem>
  <MenuItem value="Contract">Contract</MenuItem>
</TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              
            </Grid>

     <Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Minimum Salary"
    name="minSalary"
    value={jobData.minSalary}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Maximum Salary"
    name="maxSalary"
    value={jobData.maxSalary}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Vacancies"
    type="number"
    name="vacancies"
    value={jobData.vacancies}
    onChange={handleChange}
  />
</Grid>

            <Grid item xs={12}>
              <TextField
  fullWidth
  label="Required Skills"
  placeholder="React, Node.js, MongoDB"
  name="skills"
  value={jobData.skills}
  onChange={handleChange}
/>
            </Grid>

            <Grid item xs={12}>
  <TextField
  fullWidth
  multiline
  rows={5}
  label="Job Description"
  name="description"
  value={jobData.description}
  onChange={handleChange}
/>
</Grid>

<Grid item xs={12}>
  <TextField
  fullWidth
  multiline
  rows={4}
  label="Requirements"
  name="requirements"
  value={jobData.requirements}
  onChange={handleChange}
/>
</Grid>

<Grid item xs={12}>
  <TextField
  fullWidth
  multiline
  rows={3}
  label="Benefits"
  name="benefits"
  value={jobData.benefits}
  onChange={handleChange}
/>
</Grid>
            <Grid item xs={12} sm={6}>
  <Typography
    variant="body2"
    sx={{ mb: 1, fontWeight: 600 }}
  >
    Application Deadline
  </Typography>
<TextField
  fullWidth
  type="date"
  
  name="deadline"
  value={jobData.deadline}
  onChange={handleChange}
  InputLabelProps={{
    shrink: true,
  }}
/>
</Grid>

            <Grid item xs={12} sm={6}>
              <TextField
  select
  fullWidth
  label="Work Mode"
  name="workMode"
  value={jobData.workMode}
  onChange={handleChange}
>
  <MenuItem value="Remote">Remote</MenuItem>
  <MenuItem value="Hybrid">Hybrid</MenuItem>
  <MenuItem value="On-site">On-site</MenuItem>
</TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
  control={
    <Checkbox
      name="aiScreening"
      checked={jobData.aiScreening}
      onChange={handleChange}
    />
  }
  label="Enable AI Resume Screening"
/>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button variant="outlined">
                  Save Draft
                </Button>

                <Button
  variant="contained"
  onClick={handleSubmit}
>
  Publish Job
</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}