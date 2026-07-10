import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0F172A",
        color: "white",
        mt: 10,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold">
              AI ATS
            </Typography>

            <Typography mt={2}>
              AI Powered Applicant Tracking System that
              helps companies hire smarter and faster.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold">
              Company
            </Typography>

            <Typography mt={2}>About</Typography>
            <Typography>Careers</Typography>
            <Typography>Contact</Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold">
              Product
            </Typography>

            <Typography mt={2}>Jobs</Typography>
            <Typography>Dashboard</Typography>
            <Typography>Features</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight="bold">
              Contact
            </Typography>

            <Typography mt={2}>
              support@aiats.com
            </Typography>

            <Typography>
              © 2026 AI ATS
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;