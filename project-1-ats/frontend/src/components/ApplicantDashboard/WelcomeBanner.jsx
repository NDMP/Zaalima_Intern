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
        p: { xs: 2.5, sm: 3 },
        mb: 3,
        borderRadius: 3,
        background:
          "linear-gradient(135deg,#2563EB,#4F46E5)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: { xs: "1.35rem", sm: "1.7rem" }, lineHeight: 1.2, fontWeight: 800 }}>
          Welcome back, {name} 👋
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            opacity: 0.9,
            fontSize: { xs: "0.86rem", sm: "0.95rem" },
          }}
        >
          Ready to land your next dream job?
        </Typography>

        <Chip
          label={`Profile Strength ${profileCompletion}%`}
          sx={{
            mt: 1.5,
            bgcolor: "#fff",
            color: "#2563EB",
            fontWeight: 700,
            height: 28,
            "& .MuiChip-label": { px: 1.25, fontSize: "0.72rem" },
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
          width: 56,
          height: 56,
          fontSize: 22,
          bgcolor: "#fff",
          color: "#2563EB",
        }}
      >
        {user?.name?.charAt(0)?.toUpperCase()}
      </Avatar>
    </Paper>
  );
}
