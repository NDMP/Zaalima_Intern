import {
  Paper,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlertIcon from "@mui/icons-material/InfoOutlined";

export default function ProfileCompletionCard({ user }) {
  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Company Name", value: user.companyName },
    { label: "Designation", value: user.designation },
    { label: "Website", value: user.website },
    { label: "Address", value: user.address },
    { label: "Company Description", value: user.description },
  ];

  const completedFields = fields.filter(
    (field) => field.value && field.value.trim() !== ""
  ).length;

  const completion = Math.round(
    (completedFields / fields.length) * 100
  );

  const getProgressColor = () => {
    if (completion >= 80) return "#10B981";
    if (completion >= 50) return "#F59E0B";
    return "#DC2626";
  };

  const getStatusColor = () => {
    if (completion >= 80) return "success";
    if (completion >= 50) return "warning";
    return "error";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#F8FAFC",
        mb: 3,
        transition: "all 160ms ease",
        "&:hover": {
          borderColor: "#BFDBFE",
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1D4ED8",
            flexShrink: 0,
          }}
        >
          <AlertIcon sx={{ fontSize: "1.2rem" }} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ color: "#0F172A", fontSize: "0.95rem" }}
            >
              Complete Your Profile
            </Typography>
            <Chip
              label={`${completion}% Complete`}
              size="small"
              sx={{
                bgcolor:
                  completion >= 80
                    ? "#ECFDF5"
                    : completion >= 50
                    ? "#FFFBEB"
                    : "#FEF2F2",
                color:
                  completion >= 80
                    ? "#047857"
                    : completion >= 50
                    ? "#92400E"
                    : "#991B1B",
                fontWeight: 700,
                fontSize: "0.75rem",
                borderRadius: 1,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "0.85rem",
              lineHeight: 1.4,
            }}
          >
            Build credibility with candidates by completing your profile information.
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.75,
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#64748B",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Progress
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#0F172A",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            {completedFields}/{fields.length} Fields
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={completion}
          sx={{
            height: 6,
            borderRadius: 10,
            bgcolor: "#E2E8F0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 10,
              backgroundColor: getProgressColor(),
            },
          }}
        />
      </Box>

      {/* Field Status */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1,
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              p: 1,
              borderRadius: 1.5,
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
            }}
          >
            {field.value ? (
              <CheckCircleIcon
                sx={{
                  fontSize: "0.9rem",
                  color: "#10B981",
                  flexShrink: 0,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "0.9rem",
                  height: "0.9rem",
                  borderRadius: "50%",
                  border: "2px solid #CBD5E1",
                  flexShrink: 0,
                }}
              />
            )}

            <Typography
              sx={{
                fontSize: "0.8rem",
                color: field.value ? "#0F172A" : "#64748B",
                fontWeight: field.value ? 600 : 400,
              }}
            >
              {field.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}