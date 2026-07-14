import { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

import { ApplicationContext } from "../../context/ApplicationContext";

export default function MyApplications() {
  const { applications } = useContext(ApplicationContext);

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
            key={app.id}
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
              {app.jobTitle}
            </Typography>

            <Typography color="text.secondary">
              {app.company}
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
                label={app.appliedOn}
              />
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}