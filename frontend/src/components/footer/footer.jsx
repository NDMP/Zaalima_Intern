import { Box, Container, Grid, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box id="contact" sx={{ bgcolor: "#0F172A", color: "#F8FAFC", mt: 10, py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              TalentFlow
            </Typography>
            <Typography color="rgba(248,250,252,0.78)" sx={{ maxWidth: 320, lineHeight: 1.8 }}>
              A premium AI hiring platform helping teams move from screening to offer with clarity and speed.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2}>Company</Typography>
            <Stack spacing={1.25} sx={{ color: "rgba(248,250,252,0.72)" }}>
              <Typography>About</Typography>
              <Typography>Careers</Typography>
              <Typography>Contact</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2}>Product</Typography>
            <Stack spacing={1.25} sx={{ color: "rgba(248,250,252,0.72)" }}>
              <Typography>Jobs</Typography>
              <Typography>Dashboard</Typography>
              <Typography>Features</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={2}>Contact</Typography>
            <Stack spacing={1.25} sx={{ color: "rgba(248,250,252,0.72)" }}>
              <Typography>support@talentflow.ai</Typography>
              <Typography>© 2026 TalentFlow</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;