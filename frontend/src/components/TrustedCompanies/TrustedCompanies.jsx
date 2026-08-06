import { Box, Container, Typography } from "@mui/material";

<<<<<<< HEAD
const companies = ["Google", "Microsoft", "Amazon", "Adobe", "Spotify", "Slack"];

export default function TrustedCompanies() {
  return (
    <Box sx={{ py: 8, bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography align="center" sx={{ fontSize: "0.9rem", letterSpacing: "3px", fontWeight: 700, color: "#64748B", mb: 4 }}>
          TRUSTED BY WORLD-CLASS COMPANIES
        </Typography>
        <Box sx={{ borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", py: 4 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(3,1fr)", md: "repeat(6,1fr)" }, gap: 3, alignItems: "center" }}>
            {companies.map((company) => (
              <Typography key={company} align="center" sx={{ color: "#94A3B8", fontSize: { xs: "1.25rem", md: "1.6rem" }, fontWeight: 700, letterSpacing: "0.02em", transition: "color 250ms ease, transform 250ms ease", '&:hover': { color: "#2563EB", transform: "translateY(-3px)" } }}>
=======
const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Adobe",
  "Spotify",
  "Slack",
];

export default function TrustedCompanies() {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="xl">

        <Typography
          align="center"
          sx={{
            fontSize: "0.9rem",
            letterSpacing: "3px",
            fontWeight: 700,
            color: "#0F172A",
            mb: 5,
          }}
        >
          TRUSTED BY WORLD-CLASS COMPANIES
        </Typography>

        <Box
          sx={{
            borderTop: "1px solid #E5E7EB",
            borderBottom: "1px solid #E5E7EB",
            py: 5,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2,1fr)",
                sm: "repeat(3,1fr)",
                md: "repeat(6,1fr)",
              },
              gap: 4,
              alignItems: "center",
            }}
          >
            {companies.map((company) => (
              <Typography
                key={company}
                align="center"
                sx={{
                  color: "#94A3B8",
                  fontSize: {
                    xs: "1.6rem",
                    md: "2rem",
                  },
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "0.3s ease",

                  "&:hover": {
                    color: "#2563EB",
                    transform: "translateY(-4px)",
                  },
                }}
              >
>>>>>>> origin/main
                {company}
              </Typography>
            ))}
          </Box>
        </Box>
<<<<<<< HEAD
=======

>>>>>>> origin/main
      </Container>
    </Box>
  );
}