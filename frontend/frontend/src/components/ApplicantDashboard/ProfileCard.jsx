import { Paper, Avatar, Typography, Box, LinearProgress } from "@mui/material";

export default function ProfileCard({
  name = "Applicant",
  field = "Software Development",
  profileCompletion = 0,
}) {
  const initial = name?.[0]?.toUpperCase() || "A";

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
          {initial}
        </Avatar>

        <Typography variant="h6">
          {name}
        </Typography>

        <Typography color="text.secondary">
          {field}
        </Typography>

        <Typography mt={3}>
          Profile Completion
        </Typography>

        <LinearProgress
          variant="determinate"
          value={profileCompletion}
          sx={{
            mt: 1,
            height: 10,
            borderRadius: 5,
          }}
        />

        <Typography mt={1}>
          {profileCompletion}%
        </Typography>
      </Box>
    </Paper>
  );
}