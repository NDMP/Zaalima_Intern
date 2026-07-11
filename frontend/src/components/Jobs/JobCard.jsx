import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

export default function JobCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        transition: ".3s",

        "&:hover": {
          boxShadow: "0 20px 40px rgba(15,23,42,.08)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Frontend Developer
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        TalentFlow Technologies
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        <Chip label="Full Time" color="primary" />
        <Chip label="Remote" color="success" />
        <Chip label="AI Enabled" color="secondary" />
      </Box>

      <Typography
        color="text.secondary"
        mt={2}
      >
        Posted 3 days ago
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
        }}
      >
        <Button variant="contained">
          Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
}