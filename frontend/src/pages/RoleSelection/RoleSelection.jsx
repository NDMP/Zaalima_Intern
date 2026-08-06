<<<<<<< HEAD
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
=======
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";

>>>>>>> origin/main
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", display: "flex", alignItems: "center", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={800} align="center">Choose your role</Typography>
        <Typography align="center" color="text.secondary" mb={6} sx={{ maxWidth: 560, mx: "auto" }}>
          Select how you want to use TalentFlow and continue into the right workspace.
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, textAlign: "center", border: "1px solid #E2E8F0", transition: "transform 250ms ease, box-shadow 250ms ease", '&:hover': { transform: "translateY(-4px)", boxShadow: "0 18px 40px rgba(37, 99, 235, 0.12)" } }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 70, height: 70, borderRadius: "50%", bgcolor: "rgba(37, 99, 235, 0.12)", mb: 2 }}>
              <BusinessCenterIcon sx={{ fontSize: 34, color: "#2563EB" }} />
            </Box>
            <Typography variant="h5" fontWeight={700} mt={1}>Recruiter</Typography>
            <Typography color="text.secondary" mt={1} mb={3}>Hire top talent using AI-powered recruitment.</Typography>
            <Button fullWidth variant="contained" onClick={() => navigate("/recruiter/login")}>Continue as Recruiter</Button>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, textAlign: "center", border: "1px solid #E2E8F0", transition: "transform 250ms ease, box-shadow 250ms ease", '&:hover': { transform: "translateY(-4px)", boxShadow: "0 18px 40px rgba(37, 99, 235, 0.12)" } }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 70, height: 70, borderRadius: "50%", bgcolor: "rgba(37, 99, 235, 0.12)", mb: 2 }}>
              <PersonIcon sx={{ fontSize: 34, color: "#2563EB" }} />
            </Box>
            <Typography variant="h5" fontWeight={700} mt={1}>Applicant</Typography>
            <Typography color="text.secondary" mt={1} mb={3}>Search jobs and apply with your resume.</Typography>
            <Button fullWidth variant="contained" onClick={() => navigate("/applicant/login")}>Continue as Applicant</Button>
=======
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight={800}
          align="center"
        >
          Choose Your Role
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={6}
        >
          Select how you want to use TalentFlow.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* Recruiter */}

          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: "24px",
              textAlign: "center",
              border: "1px solid #E5E7EB",
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 15px 40px rgba(37,99,235,.15)",
              },
            }}
          >
            <BusinessCenterIcon
              sx={{
                fontSize: 60,
                color: "#2563EB",
              }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
              mt={2}
            >
              Recruiter
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
              mb={4}
            >
              Hire top talent using AI-powered recruitment.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                navigate("/recruiter/login")
              }
            >
              Continue as Recruiter
            </Button>
          </Paper>

          {/* Applicant */}

          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: "24px",
              textAlign: "center",
              border: "1px solid #E5E7EB",
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 15px 40px rgba(37,99,235,.15)",
              },
            }}
          >
            <PersonIcon
              sx={{
                fontSize: 60,
                color: "#2563EB",
              }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
              mt={2}
            >
              Applicant
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
              mb={4}
            >
              Search jobs and apply with your resume.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                navigate("/applicant/login")
              }
            >
              Continue as Applicant
            </Button>
>>>>>>> origin/main
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}