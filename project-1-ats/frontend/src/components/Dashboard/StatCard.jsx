import { Paper, Typography, Box } from "@mui/material";

export default function StatCard({
  title,
  value,
  detail,
  icon,
  color,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.25 },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        minHeight: 120,
        transition: "all 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
          borderColor: "#BFDBFE",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          minHeight: 54,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: color,
              color: "#0F172A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "1.35rem",
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "#0F172A",
              fontSize: { xs: "1.5rem", md: "2rem" },
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          mt: 1.75,
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "#64748B",
          px: 1.25,
          py: 0.55,
          borderRadius: 1.5,
          bgcolor: "#F8FAFC",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #E2E8F0",
        }}
      >
        {detail}
      </Typography>
    </Paper>
  );
}