import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import axios from "axios";
import { getToken } from "../../utils/auth";

export default function JobDetails() {
  const { id } = useParams();

const [job, setJob] = useState(null);

useEffect(() => {
  const fetchJob = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJob(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchJob();
}, [id]);

  if (!job) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">
        Loading...
      </Typography>
    </Box>
  );
}
  return (
    <Box sx={{ p: 4, background: "#F8FAFC", minHeight: "100vh" }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {job.title}
        </Typography>

        <Typography color="text.secondary" mt={1}>
          {job.company}
        </Typography>

        <Stack direction="row" spacing={1} mt={3}>
          <Chip label={job.location} />
          <Chip label={job.workMode} color="success" />
          <Chip label={job.employmentType} color="primary" />
        </Stack>

        <Typography mt={4} fontWeight={700}>
          Salary
        </Typography>

        <Typography>
          ₹ {job.minSalary} - ₹ {job.maxSalary}
        </Typography>

        <Typography mt={4} fontWeight={700}>
          Skills
        </Typography>

        <Typography>{job.skills}</Typography>

        <Typography mt={4} fontWeight={700}>
          Job Description
        </Typography>

        <Typography>{job.description}</Typography>

        <Typography mt={4} fontWeight={700}>
          Requirements
        </Typography>

        <Typography>{job.requirements}</Typography>

        <Typography mt={4} fontWeight={700}>
          Benefits
        </Typography>

        <Typography>{job.benefits}</Typography>

        <Button
  component={Link}
  to={`/applicant/jobs/${job._id}/apply`}
  variant="contained"
  sx={{ mt: 4 }}
>
  Apply Now
</Button>
      </Paper>
    </Box>
  );
}