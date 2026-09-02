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
    window.addEventListener("saved-jobs-updated", fetchSavedJobs);
    return () => window.removeEventListener("saved-jobs-updated", fetchSavedJobs);
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
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
        sx={{ color: "#0F172A", fontWeight: 800 }}
      >
        ❤️ Saved Jobs
      </Typography>

      <Grid container spacing={3}>
        {jobs.length === 0 ? (
          <Grid size={12}>
            <Box
              sx={{
                 textAlign: "center",
                  py: 8,
                }}
              > 
              <Typography variant="h5" fontWeight={600}>
                    No Saved Jobs
              </Typography>

              <Typography color="text.secondary" mt={1}>
                 Save jobs to access them quickly later.
                  </Typography>
                       </Box>
                
            
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
