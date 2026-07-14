import { useContext } from "react";
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

console.log("Applicant Jobs:", jobs);

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
          }}
        >
          <Typography>
            No jobs available.
          </Typography>
        </Paper>
      ) : (
        jobs.map((job) => (
          <Paper
            key={job.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 4,
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
            >
              <Chip
                label={job.location}
              />

              <Chip
                label={job.workMode}
                color="success"
              />

              <Chip
                label={job.employmentType}
                color="primary"
              />
            </Stack>

            <Typography mb={2}>
              ₹ {job.minSalary} - ₹ {job.maxSalary}
            </Typography>

            <Button
              variant="contained"
            >
              Apply Now
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
}