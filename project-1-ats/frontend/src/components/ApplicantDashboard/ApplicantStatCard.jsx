import { Paper, Typography, Box } from "@mui/material";

export default function ApplicantStatCard({
  title,
  value,
  color,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          mt={1}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 50,
          height: 50,
          bgcolor: color,
          borderRadius: 3,
        }}
      />
    </Paper>
  );
}