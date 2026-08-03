import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import ApplicantJobCard from "../../components/ApplicantDashboard/ApplicantJobCard";
import api from "../../utils/api";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get("/jobs/saved");
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
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
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        ❤️ Saved Jobs
      </Typography>

      <Grid container spacing={3}>
        {jobs.length === 0 ? (
          <Grid size={12}>
            <Typography
              textAlign="center"
              color="text.secondary"
            >
              No saved jobs yet.
            </Typography>
          </Grid>
        ) : (
          jobs.map((job) => (
            <Grid
              key={job._id}
              size={{ xs: 12, md: 6 }}
            >
              <ApplicantJobCard job={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}