import React from "react";
import { Box, Typography, Button, Container, Chip } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Box id="home" sx={{ pt: { xs: 15, md: 20 }, pb: { xs: 10, md: 15 }, scrollMarginTop: 88 }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720, mx: "auto", textAlign: { xs: "left", md: "center" } }}>
          <Chip
            label="AI-Powered Hiring Platform"
            sx={{ bgcolor: "#EFF6FF", color: "#2563EB", fontWeight: 600, mb: 3, px: 1 }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" }, fontWeight: 800, lineHeight: 1.1, color: "#0F172A", mb: 3 }}
          >
            Hire Smarter,<br />
            <Box component="span" sx={{ background: "linear-gradient(to right, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              With AI
            </Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
            Streamline recruitment with AI-powered resume screening, intelligent candidate ranking, and real-time hiring analytics — all in one platform.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { md: "center" }, gap: 2, flexWrap: "wrap", mb: 5 }}>
            <Button component={Link} to="/choose-role" variant="contained" size="large" sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
              Get Started →
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: { md: "center" }, gap: { xs: 2, sm: 3 }, flexWrap: "wrap" }}>
            {["AI Resume Screening", "Smart Candidate Ranking", "One-click Hiring"].map((feature) => (
              <Box key={feature} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="success" fontSize="small" />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
