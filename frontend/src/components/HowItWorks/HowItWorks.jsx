import { Box, Container, Typography, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CelebrationIcon from "@mui/icons-material/Celebration";

const steps = [
  { number: "01", icon: <WorkIcon color="primary" sx={{ fontSize: 32 }} />, title: "Post a Job", desc: "Create and publish your job opening in minutes." },
  { number: "02", icon: <SmartToyIcon color="primary" sx={{ fontSize: 32 }} />, title: "AI Screens Resumes", desc: "TalentFlow analyzes resumes and ranks candidates instantly." },
  { number: "03", icon: <ChecklistIcon color="primary" sx={{ fontSize: 32 }} />, title: "Shortlist Candidates", desc: "Review the highest-scoring applicants with one click." },
  { number: "04", icon: <CelebrationIcon color="primary" sx={{ fontSize: 32 }} />, title: "Hire the Best", desc: "Schedule interviews and hire your ideal candidate faster." },
];

export default function HowItWorks() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 10, md: 12 }, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography align="center" sx={{ color: "#2563EB", fontWeight: 700, letterSpacing: 3, mb: 2 }}>
          HOW IT WORKS
        </Typography>
        <Typography align="center" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 800, color: "#0F172A", mb: 2 }}>
          Hire in 4 simple steps
        </Typography>
        <Typography align="center" sx={{ color: "#64748B", maxWidth: 680, mx: "auto", mb: 6 }}>
          Our AI-powered hiring workflow helps recruiters save time and find better candidates faster.
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(4,1fr)" }, gap: 3 }}>
          {steps.map((step) => (
            <Paper key={step.number} elevation={0} sx={{ p: 4, borderRadius: 3, textAlign: "center", border: "1px solid #E2E8F0", transition: "transform 250ms ease, box-shadow 250ms ease", '&:hover': { transform: "translateY(-6px)", boxShadow: "0 16px 40px rgba(37, 99, 235, 0.12)" } }}>
              <Typography sx={{ color: "#CBD5E1", fontWeight: 800, fontSize: "1.75rem" }}>{step.number}</Typography>
              <Box my={2}>{step.icon}</Box>
              <Typography variant="h6" fontWeight={700} mb={1.25}>{step.title}</Typography>
              <Typography color="text.secondary">{step.desc}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}