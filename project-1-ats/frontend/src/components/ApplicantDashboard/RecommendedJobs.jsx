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
        window.dispatchEvent(new Event("saved-jobs-updated"));

        toast.success("Removed from Saved Jobs");
      } else {
        await api.post(`/jobs/${jobId}/save`);

        setSavedJobs((prev) => [...prev, jobId]);
        window.dispatchEvent(new Event("saved-jobs-updated"));

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
              p: { xs: 2.5, sm: 3 },
              mb: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
              transition: "box-shadow 180ms ease, transform 180ms ease",
              "&:hover": {
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#0F172A", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {job.title}
            </Typography>

            <Typography color="text.secondary" mt={0.75} mb={2.25}>
              {job.company}
            </Typography>

            <Stack
              direction="row"
              spacing={1.25}
              mb={2.25}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip label={job.location} sx={{ fontWeight: 500 }} />

              <Chip
                label={job.workMode}
                color="success"
                sx={{ fontWeight: 500 }}
              />

              <Chip
                label={job.employmentType}
                color="primary"
                sx={{ fontWeight: 500 }}
              />
            </Stack>

            <Typography color="#334155" fontWeight={700} mb={2.5}>
              INR {job.minSalary} - INR {job.maxSalary}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
                mt: 2.5,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                <Button
                  component={Link}
                  to={`/applicant/jobs/${job._id}`}
                  variant="outlined"
                  sx={{
                    minHeight: 48, px: 2.5, borderRadius: 2.5, borderColor: "#1D4ED8", borderWidth: 1.5,
                    color: "#1D4ED8", fontWeight: 700, whiteSpace: "nowrap",
                    transition: "background-color 160ms ease, transform 160ms ease",
                    "&:hover": { borderColor: "#2563EB", backgroundColor: "#EFF6FF", transform: "translateY(-1px)" },
                  }}
                >
                  View Details
                </Button>

                <Button
                  component={Link}
                  to={`/applicant/jobs/${job._id}/apply`}
                  variant="contained"
                  sx={{
                    minHeight: 48, px: 2.75, borderRadius: 2.5, bgcolor: "#2563EB", fontWeight: 700,
                    whiteSpace: "nowrap", boxShadow: "0 4px 10px rgba(23, 59, 120, 0.22)",
                    transition: "background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",
                    "&:hover": { bgcolor: "#1D4ED8", transform: "translateY(-1px)", boxShadow: "0 6px 14px rgba(23, 59, 120, 0.28)" },
                  }}
                >
                  Apply Now
                </Button>
              </Box>

              <IconButton
                color="error"
                onClick={() => toggleSaveJob(job._id)}
                aria-label={savedJobs.includes(job._id) ? "Remove saved job" : "Save job"}
                sx={{ alignSelf: { xs: "flex-end", sm: "center" }, ml: { sm: "auto" } }}
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
