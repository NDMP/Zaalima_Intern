import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
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
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}