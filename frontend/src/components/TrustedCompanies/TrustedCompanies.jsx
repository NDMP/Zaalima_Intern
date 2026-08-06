import { Box, Container, Typography } from "@mui/material";

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
                {company}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}