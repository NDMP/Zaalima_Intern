import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

import axios from "axios";
import { getToken } from "../../utils/auth";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        "http://localhost:5000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  fetchApplications();
}, []);

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
        My Applications
      </Typography>

      {applications.length === 0 ? (
        <Typography color="text.secondary">
          No applications submitted yet.
        </Typography>
      ) : (
        applications.map((app) => (
          <Paper
            key={app._id}
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
              {app.job?.title}
            </Typography>

            <Typography color="text.secondary">
              {app.job?.company}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              mt={2}
            >
              <Chip
                label={app.status}
                color="warning"
              />

              <Chip
  label={new Date(app.createdAt).toLocaleDateString()}
/>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}