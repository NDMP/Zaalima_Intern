import { Paper, Typography, Box } from "@mui/material";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 45px rgba(15,23,42,.08)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            fontSize={15}
          >
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
            width: 60,
            height: 60,
            borderRadius: "18px",
            bgcolor: color,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
}