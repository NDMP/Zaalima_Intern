import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JobContext } from "../../context/JobContext";
import api from "../../utils/api";



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

  const dropdownMenuProps = {
    PaperProps: {
      sx: {
        zIndex: 2000,
        mt: 1,
        borderRadius: 2,
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
      },
    },
    MenuListProps: {
      sx: { py: 0.5 },
    },
  };

  const [jobData, setJobData] = useState(initialJobData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { editingJob, setEditingJob } = useContext(JobContext);
  const navigate = useNavigate();
const handleChange = (event) => {
  const { name, value, type, checked } = event.target;

  setJobData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
useEffect(() => {
  if (editingJob) {
    setJobData(editingJob);
  }
}, [editingJob]);
const handleSubmit = async () => {
  if (!jobData.title.trim()) {
  setErrors((prev) => ({
  ...prev,
  title: "Job Title is required",
}));

toast.error("Job Title is required");
return;
}

  if (!jobData.company.trim()) {
  setErrors((prev) => ({
    ...prev,
    company: "Company Name is required",
  }));

  toast.error("Company Name is required");
  return;
}

if (!jobData.location.trim()) {
  setErrors((prev) => ({
    ...prev,
    location: "Location is required",
  }));

  toast.error("Location is required");
  return;
}

if (!jobData.employmentType) {
  toast.error("Please select employment type");
  return;
}

if (!jobData.workMode) {
  toast.error("Please select work mode");
  return;
}

if (!jobData.skills.trim()) {
  setErrors((prev) => ({
    ...prev,
    skills: "Required skills are mandatory",
  }));

  toast.error("Required skills are mandatory");
  return;
}

if (!jobData.description.trim()) {
  setErrors((prev) => ({
    ...prev,
    description: "Job description is required",
  }));

  toast.error("Job description is required");
  return;
}

if (!jobData.requirements.trim()) {
  setErrors((prev) => ({
    ...prev,
    requirements: "Requirements are required",
  }));

  toast.error("Requirements are required");
  return;
}

if (!jobData.deadline) {
  toast.error("Please select application deadline");
  return;
}
setLoading(true);


  

  try {
    if (editingJob) {
      await api.put(
        `/jobs/${editingJob._id}`,
        jobData
      );

       

      toast.success("Job updated successfully!");
      setEditingJob(null);
    } else {
      
      await api.post(
        "/jobs",
        jobData
      );
        

      toast.success("Job published successfully!");
    }

    setJobData(initialJobData);
    navigate("/recruiter/jobs");
  } catch (error) {
    console.error(error);
    console.error(error.response);

    toast.error(
  error.response?.data?.message || error.message
);
  }
  finally{
    setLoading(false);
}
};
  return (
    <>
      <Box
  sx={{
    width: "100%",
  }}
>
        <Typography
  variant="h4"
  fontWeight={800}
  mb={1}
>
  {editingJob ? "Update Job" : "Create New Job"}
</Typography>
        <Typography color="text.secondary" mb={3}>Add the details candidates need to understand this opportunity.</Typography>

        <Paper
  sx={{
    p: 4,
    borderRadius: 4,
    maxWidth: 1100,
    mx: "auto",
    border: "1px solid #E2E8F0",
    boxShadow: "0 12px 32px rgba(15,23,42,.05)",
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
  error={!!errors.title}
  helperText={errors.title}
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
  error={!!errors.company}
  helperText={errors.company}
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
  error={!!errors.location}
  helperText={errors.location}
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
  SelectProps={{ MenuProps: dropdownMenuProps }}
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: 2,
    },
  }}
>
  <MenuItem value="Full Time">Full Time</MenuItem>
  <MenuItem value="Part Time">Part Time</MenuItem>
  <MenuItem value="Internship">Internship</MenuItem>
  <MenuItem value="Contract">Contract</MenuItem>
</TextField>
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
  error={!!errors.skills}
  helperText={errors.skills}
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
  error={!!errors.description}
  helperText={errors.description}
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
  error={!!errors.requirements}
  helperText={errors.requirements}
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
  SelectProps={{ MenuProps: dropdownMenuProps }}
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: 2,
    },
  }}
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
                <Button variant="outlined" sx={{ borderRadius: 2, textTransform: "none" }}>
                  Save Draft
                </Button>

                <Button
  variant="contained"
  sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? "Saving..."
    : editingJob
    ? "Update Job"
    : "Publish Job"}
</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
