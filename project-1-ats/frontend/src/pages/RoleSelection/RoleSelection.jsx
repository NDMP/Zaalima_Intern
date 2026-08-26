import { Box, Button, Chip, Container, Paper, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "I’m a recruiter",
    description: "Build high-performing teams with a faster, smarter hiring workflow.",
    highlights: ["Post and manage jobs", "Screen candidates with AI", "Track your hiring pipeline"],
    buttonLabel: "Continue as recruiter",
    path: "/recruiter/login",
    icon: <BusinessCenterIcon sx={{ fontSize: 30 }} />,
    accent: "#2563EB",
    iconBackground: "#EFF6FF",
  },
  {
    title: "I’m a job seeker",
    description: "Discover relevant opportunities and manage every application in one place.",
    highlights: ["Browse tailored job openings", "Apply with your profile", "Track applications easily"],
    buttonLabel: "Continue as job seeker",
    path: "/applicant/login",
    icon: <PersonIcon sx={{ fontSize: 30 }} />,
    accent: "#7C3AED",
    iconBackground: "#F5F3FF",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 5, md: 9 }, display: "flex", alignItems: "center", bgcolor: "#F8FAFC", background: "radial-gradient(circle at 50% 0%, #E0E7FF 0%, #F8FAFC 38%, #F8FAFC 100%)" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Chip label="TALENTFLOW" sx={{ bgcolor: "#E0E7FF", color: "#3730A3", fontWeight: 700, letterSpacing: 1.2, mb: 2.5 }} />
          <Typography sx={{ color: "#0F172A", fontSize: { xs: "2.25rem", sm: "3rem" }, fontWeight: 800, lineHeight: 1.15, mb: 1.5 }}>
            How would you like to get started?
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "1.05rem", maxWidth: 560, mx: "auto" }}>
            Choose the experience that best fits your goals. You can create your account in just a few steps.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
          {roles.map((role) => (
            <Paper
              key={role.title}
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                border: "1px solid #E2E8F0",
                textAlign: "left",
                transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
                "&:hover": { transform: "translateY(-5px)", borderColor: role.accent, boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)" },
              }}
            >
              <Box sx={{ width: 58, height: 58, display: "grid", placeItems: "center", borderRadius: 3, bgcolor: role.iconBackground, color: role.accent, mb: 3 }}>
                {role.icon}
              </Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 700, mb: 1.25 }}>{role.title}</Typography>
              <Typography sx={{ color: "#64748B", lineHeight: 1.65, mb: 3 }}>{role.description}</Typography>
              <Box sx={{ display: "grid", gap: 1.15, mb: 3.5 }}>
                {role.highlights.map((highlight) => (
                  <Box key={highlight} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleOutlineIcon sx={{ color: role.accent, fontSize: 19 }} />
                    <Typography sx={{ color: "#475569", fontSize: "0.9rem" }}>{highlight}</Typography>
                  </Box>
                ))}
              </Box>
              <Button fullWidth variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => navigate(role.path)} sx={{ py: 1.35, borderRadius: 2, bgcolor: role.accent, "&:hover": { bgcolor: role.accent, filter: "brightness(.9)" } }}>
                {role.buttonLabel}
              </Button>
            </Paper>
          ))}
        </Box>

        <Typography sx={{ mt: 4, textAlign: "center", color: "#64748B", fontSize: "0.9rem" }}>
          Already have an account? Select your role above to sign in.
        </Typography>
      </Container>
    </Box>
  );
}
