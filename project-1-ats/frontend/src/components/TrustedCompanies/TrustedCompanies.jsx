import { Box, Container, Typography } from "@mui/material";

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
                {company}
              </Typography>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}