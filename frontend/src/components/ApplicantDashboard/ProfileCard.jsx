import { Paper, Avatar, Typography, Box, LinearProgress } from "@mui/material";

export default function ProfileCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <Box textAlign="center">
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
          }}
        >
          A
        </Avatar>

        <Typography variant="h6">
          Ankur Ojha
        </Typography>

        <Typography color="text.secondary">
          Automation & Robotics
        </Typography>

        <Typography mt={3}>
          Profile Completion
        </Typography>

        <LinearProgress
          variant="determinate"
          value={82}
          sx={{
            mt: 1,
            height: 10,
            borderRadius: 5,
          }}
        />

        <Typography mt={1}>
          82%
        </Typography>
      </Box>
    </Paper>
  );
}