import { Paper, Typography } from "@mui/material";

export default function AIInsights({ insights = [] }) {
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

      {insights.length === 0 ? (
        <Typography mt={2}>No AI insights available yet.</Typography>
      ) : (
        insights.map((insight) => (
          <Typography mt={2} key={insight}>
            • {insight}
          </Typography>
        ))
      )}
     </Paper>
  );
}