import { Paper, Typography, Box } from "@mui/material";

export default function ApplicantStatCard({ title, value, color, icon }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
        "&:hover": { borderColor: "#BFDBFE", boxShadow: "0 8px 20px rgba(15,23,42,.08)", transform: "translateY(-2px)" },
      }}
    >
      <Box>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: 600 }}>
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

      <Box sx={{ color, display: "grid", placeItems: "center", flexShrink: 0, ml: 1 }}>{icon}</Box>
    </Paper>
  );
}
