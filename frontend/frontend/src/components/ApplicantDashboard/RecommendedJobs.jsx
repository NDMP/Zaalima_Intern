import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";

import { JobContext } from "../../context/JobContext";

export default function RecommendedJobs() {
  const { jobs } = useContext(JobContext);

  return (
    <Box mt={5}>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
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
            key={job.id}
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
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {job.title}
            </Typography>

            <Typography
              color="text.secondary"
              mb={2}
            >
              {job.company}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              mb={2}
              flexWrap="wrap"
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

            <Typography
              fontWeight={600}
              mb={2}
            >
              ₹ {job.minSalary} - ₹ {job.maxSalary}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                component={Link}
                to={`/applicant/jobs/${job.id}`}
                variant="outlined"
              >
                View Details
              </Button>

              <Button
                component={Link}
                to={`/applicant/jobs/${job.id}/apply`}
                variant="contained"
              >
                Apply Now
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
}