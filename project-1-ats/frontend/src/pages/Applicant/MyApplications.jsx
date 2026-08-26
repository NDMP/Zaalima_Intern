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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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
        p: { xs: 1, sm: 2, md: 3 },
        background: "#F8FAFC",
        minHeight: "100%",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ color: "#0F172A", fontWeight: 800, mb: 3 }}>
        <AssignmentTurnedInIcon sx={{ mr: 1, verticalAlign: "-5px", color: "#2563EB" }} />
        My Applications
      </Typography>

      {applications.length === 0 ? (
        <Typography color="text.secondary">
          No applications submitted yet.
        </Typography>
      ) : (
        applications.filter((app) => app.job?._id).map((app) => (
          <Paper
            key={app._id}
            sx={{
              p: { xs: 2, sm: 2.5 },
              mb: 3,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 8px rgba(15,23,42,.04)",
              transition: "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
              "&:hover": { borderColor: "#BFDBFE", boxShadow: "0 8px 20px rgba(15,23,42,.08)", transform: "translateY(-2px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#0F172A", fontWeight: 800, overflowWrap: "anywhere" }}
            >
              {app.job?.title}
            </Typography>

            <Typography color="text.secondary">
              {app.job?.company}
            </Typography>

            <Stack
              direction="row"
              spacing={1.25}
              mt={2}
              flexWrap="wrap"
              useFlexGap
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
