import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { getUser } from "../../utils/auth";

export default function WelcomeBanner({
  name = "Applicant",
  profileCompletion = 0,
}) {
  const user = getUser();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const IMAGE_URL = API_URL.replace(
    /\/api\/?$/,
    "/uploads"
  );

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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
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
        src={
          user?.applicantProfile?.profileImage
            ? `${IMAGE_URL}/${user.applicantProfile.profileImage}`
            : ""
        }
        sx={{
          width: 80,
          height: 80,
          fontSize: 30,
          bgcolor: "#fff",
          color: "#2563EB",
        }}
      >
        {user?.name?.charAt(0)?.toUpperCase()}
      </Avatar>
    </Paper>
  );
}