import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function JobCard({
  job,
  refreshJobs,
}) {

  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {job.title}
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            {job.company}
          </Typography>
        </Box>

        <Chip
          label={job.workMode}
          color="success"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* Details */}
      <Stack spacing={1.5}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon color="primary" fontSize="small" />
          <Typography>{job.location}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <WorkIcon color="primary" fontSize="small" />
          <Typography>
            {job.employmentType} • {job.experience}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <CurrencyRupeeIcon color="primary" fontSize="small" />
          <Typography>
            ₹ {job.minSalary} - ₹ {job.maxSalary}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <PsychologyIcon color="primary" fontSize="small" />
          <Typography>
            {job.aiScreening
              ? "AI Screening Enabled"
              : "AI Screening Disabled"}
          </Typography>
        </Box>
      </Stack>

      {/* Skills */}
      <Box mt={3}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          mb={1}
        >
          Skills
        </Typography>

        <Chip
          label={job.skills || "Not specified"}
          variant="outlined"
          color="primary"
        />
      </Box>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        mt={4}
      >
        <Button
  variant="outlined"
  startIcon={<EditIcon />}
  onClick={() => {
    setEditingJob(job);
    navigate("/recruiter/jobs/create");
  }}
>
  Edit
</Button>

        <Button
  variant="contained"
  color="error"
  startIcon={<DeleteIcon />}
  onClick={async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${job._id}`
      );

      alert("Job deleted successfully!");

      refreshJobs();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }}
>
  Delete
</Button>
      </Box>
    </Paper>
  );
}