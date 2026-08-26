import { useState, useEffect } from "react";
import JobCard from "../../components/Jobs/JobCard";
import { Button, Box, Typography, Stack, Chip, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../utils/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ fontSize: { xs: "1.75rem", md: "2rem" }, color: "#0F172A" }}
          >
            Jobs
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 0.5, color: "#64748B" }}
          >
            Create and manage the roles your team is hiring for.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/recruiter/jobs/create"
          variant="contained"
          sx={{
            minHeight: 44,
            px: 3,
            borderRadius: 2,
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(23, 59, 120, 0.2)",
            transition: "all 160ms ease",
            "&:hover": {
              backgroundColor: "#1D4ED8",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px rgba(23, 59, 120, 0.28)",
            },
          }}
        >
          + Create Job
        </Button>
      </Box>

      {/* Active Roles Chip */}
      <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexWrap: "wrap" }}>
        <Chip
          label={`${jobs.length} ${jobs.length === 1 ? "active role" : "active roles"}`}
          sx={{
            bgcolor: "#1E293B",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.85rem",
            borderRadius: 1.5,
          }}
        />
      </Stack>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            color: "text.secondary",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#334155", fontWeight: 600, mb: 1 }}
          >
            No Jobs Posted Yet
          </Typography>
          <Typography sx={{ color: "#64748B" }}>
            Click "Create Job" to publish your first job.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5} alignItems="stretch">
          {jobs.map((job) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={job._id} sx={{ display: "flex", minWidth: 0 }}>
              <JobCard job={job} refreshJobs={fetchJobs} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
