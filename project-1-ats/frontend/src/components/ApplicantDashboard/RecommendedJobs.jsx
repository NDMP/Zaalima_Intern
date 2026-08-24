import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

import api from "../../utils/api";


export default function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  fetchJobs();
  fetchSavedJobs();
}, []);

const fetchJobs = async () => {
  try {
    const res = await api.get("/jobs");
    setJobs(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get("/jobs/saved");

      setSavedJobs(res.data.jobs.map((job) => job._id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSaveJob = async (jobId) => {
    try {
      if (savedJobs.includes(jobId)) {
        await api.delete(`/jobs/${jobId}/save`);

        setSavedJobs((prev) =>
          prev.filter((id) => id !== jobId)
        );

        toast.success("Removed from Saved Jobs");
      } else {
        await api.post(`/jobs/${jobId}/save`);

        setSavedJobs((prev) => [...prev, jobId]);

        toast.success("Job Saved");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Recommended Jobs
      </Typography>

      {jobs.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography>No jobs available.</Typography>
        </Paper>
      ) : (
        jobs.map((job) => (
          <Paper
            key={job._id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 12px 30px rgba(0,0,0,.08)",
              },
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {job.title}
            </Typography>

            <Typography color="text.secondary" mb={2}>
              {job.company}
            </Typography>

            <Stack
  direction="row"
  spacing={1}
  mb={2}
  sx={{ flexWrap: "wrap" }}
>
              <Chip label={job.location} />

              <Chip
                label={job.workMode}
                color="success"
              />

              <Chip
                label={job.employmentType}
                color="primary"
              />
            </Stack>

            <Typography fontWeight={600} mb={2}>
              ₹ {job.minSalary} - ₹ {job.maxSalary}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box display="flex" gap={2}>
                <Button
                  component={Link}
                  to={`/applicant/jobs/${job._id}`}
                  variant="outlined"
                >
                  View Details
                </Button>

                <Button
                  component={Link}
                  to={`/applicant/jobs/${job._id}/apply`}
                  variant="contained"
                >
                  Apply Now
                </Button>
              </Box>

              <IconButton
                color="error"
                onClick={() => toggleSaveJob(job._id)}
              >
                {savedJobs.includes(job._id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
}