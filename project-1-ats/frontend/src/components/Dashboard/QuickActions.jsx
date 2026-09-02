import { Paper, Typography, Button, Stack, Box } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={800}
        mb={0.5}
        sx={{ color: "#0F172A", fontSize: "1rem" }}
      >
        Quick Actions
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        mb={2.5}
        sx={{ color: "#64748B", fontSize: "0.85rem" }}
      >
        Jump back into your most common recruiting tasks.
      </Typography>

      <Stack spacing={1.25} sx={{ mb: 2.5 }}>
        <Button
          component={Link}
          to="/recruiter/jobs/create"
          variant="contained"
          startIcon={<AddBusinessIcon />}
          fullWidth
          sx={{
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            transition: "all 160ms ease",
            boxShadow: "0 2px 8px rgba(23, 59, 120, 0.15)",
            "&:hover": {
              backgroundColor: "#1D4ED8",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(23, 59, 120, 0.25)",
            },
          }}
        >
          + Create Job
        </Button>

        <Button
          component={Link}
          to="/recruiter/applicants"
          variant="outlined"
          startIcon={<GroupIcon />}
          fullWidth
          sx={{
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#2563EB",
            borderColor: "#DBEAFE",
            bgcolor: "#F0F9FF",
            transition: "all 160ms ease",
            "&:hover": {
              borderColor: "#BFDBFE",
              bgcolor: "#E0F2FE",
            },
          }}
        >
          Review Applicants
        </Button>

        <Button
          component={Link}
          to="/recruiter/ai-screening"
          variant="outlined"
          startIcon={<SmartToyIcon />}
          fullWidth
          sx={{
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#7C3AED",
            borderColor: "#DDD6FE",
            bgcolor: "#F5F3FF",
            transition: "all 160ms ease",
            "&:hover": {
              borderColor: "#C4B5FD",
              bgcolor: "#EDE9FE",
            },
          }}
        >
          AI Screening
        </Button>
      </Stack>

      {/* Tip Box */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#FEF3C7",
          borderRadius: 2,
          border: "1px solid #FCD34D",
          mt: "auto",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
          <LightbulbIcon
            sx={{
              color: "#D97706",
              fontSize: "1.2rem",
              flexShrink: 0,
              mt: 0.25,
            }}
          />
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color: "#D97706", display: "block", mb: 0.25 }}
            >
              Pro Tip
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#B45309", lineHeight: 1.4 }}
            >
              Use AI screening to prioritize candidates before scheduling
              interviews.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
