import {
  Box,
  Container,
  Typography,
  Paper,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import WorkIcon from "@mui/icons-material/Work";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SpeedIcon from "@mui/icons-material/Speed";

const features = [
  {
    title: "AI Resume Screening",
    icon: <SmartToyIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "Automatically analyze hundreds of resumes and shortlist the best candidates within seconds.",
  },
  {
    title: "Candidate Ranking",
    icon: <PsychologyIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "AI ranks applicants based on skills, experience, and job requirements.",
  },
  {
    title: "Job Management",
    icon: <WorkIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "Create, publish and manage all job openings from one dashboard.",
  },
  {
    title: "Hiring Analytics",
    icon: <AnalyticsIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "Track hiring performance with real-time dashboards and reports.",
  },
  {
    title: "Interview Scheduling",
    icon: <EventAvailableIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "Schedule interviews and notify candidates automatically.",
  },
  {
    title: "Fast Hiring",
    icon: <SpeedIcon sx={{ fontSize: 34, color: "#2563EB" }} />,
    desc: "Reduce recruitment time using intelligent AI-powered workflows.",
  },
];

export default function Features() {
  return (
    <Box
      sx={{
        py: 12,
        bgcolor: "#F8FAFC",
      }}
    >
      <Container maxWidth="xl">

        <Typography
          align="center"
          sx={{
            color: "#2563EB",
            fontWeight: 700,
            letterSpacing: 3,
            mb: 2,
          }}
        >
          FEATURES
        </Typography>

        <Typography
          align="center"
          sx={{
            fontSize: {
              xs: "2.3rem",
              md: "4rem",
            },
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#0F172A",
          }}
        >
          Everything you need to
          <br />
          hire faster
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#64748B",
            mt: 3,
            mb: 8,
            maxWidth: 700,
            mx: "auto",
            fontSize: "1.1rem",
          }}
        >
          From AI-powered screening to advanced hiring analytics,
          TalentFlow helps your team recruit smarter and faster.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
              
            },
            gap: 4,
          }}
        >
          {features.map((feature) => (
          <Paper
  key={feature.title}
  elevation={0}
  sx={{
    p: 5,
    borderRadius: "30px",
    bgcolor: "#fff",
    boxShadow: "0 20px 60px rgba(15,23,42,.08)",
    transition: "0.35s",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: "0 25px 70px rgba(37,99,235,.18)",
    },

    "&:hover .iconCircle": {
      transform: "scale(1.08)",
      backgroundColor: "#DBEAFE",
    },
  }}
>
          <Box
  className="iconCircle"
  sx={{
    width: 75,
    height: 75,
    borderRadius: "50%",
    bgcolor: "#EFF6FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: 4,
    transition: "0.3s",
  }}
>
                {feature.icon}
              </Box>

              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  lineHeight: 1.8,
                }}
              >
                {feature.desc}
              </Typography>

            </Paper>
          ))}
        </Box>

      </Container>
    </Box>
  );
}