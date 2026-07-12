import { Paper, Typography } from "@mui/material";

export default function AIInsights() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        AI Career Insights
      </Typography>

      <Typography mt={2}>
        • Improve React skills
      </Typography>

      <Typography>
        • Add more projects
      </Typography>

      <Typography>
        • Resume Score: 82/100
      </Typography>

      <Typography>
        • Profile is 82% complete
      </Typography>
    </Paper>
  );
}