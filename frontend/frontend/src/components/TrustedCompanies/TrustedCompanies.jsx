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
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>

        <Typography
          align="center"
          sx={{
            fontSize: "0.85rem",
            letterSpacing: "3px",
            fontWeight: 700,
            color: "#2563EB",
            mb: 4,
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
                xs: "repeat(2, minmax(120px, 1fr))",
                sm: "repeat(3, minmax(140px, 1fr))",
                md: "repeat(6, minmax(140px, 1fr))",
              },
              gap: 4,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {companies.map((company) => (
              <Typography
                key={company}
                align="center"
                sx={{
                  color: "#475569",
                  fontSize: {
                    xs: "1rem",
                    md: "1.15rem",
                  },
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "0.25s ease",

                  "&:hover": {
                    color: "#2563EB",
                    transform: "translateY(-3px)",
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