import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

export default function WelcomeBanner({ name = "Applicant", profileCompletion = 0 }) {
  const initial = name?.[0]?.toUpperCase() || "A";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#2563EB,#4F46E5)",
        color: "#fff",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Welcome back, {name} 👋
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9,
            }}
          >
            Ready to land your next dream job?
          </Typography>

          <Chip
            label={`Profile Strength ${profileCompletion}%`}
            sx={{
              mt: 3,
              bgcolor: "#fff",
              color: "#2563EB",
              fontWeight: 700,
            }}
          />
        </Box>

        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#fff",
            color: "#2563EB",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          {initial}
        </Avatar>
      </Box>
    </Paper>
  );
}