import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Stack,
} from "@mui/material";

export default function ApplicantCard({
  application,
  onShortlist,
  onReject,
}) {
  const statusColors = {
    Accepted: { bgcolor: "#ECFDF5", color: "#047857", textColor: "#059669" },
    Rejected: { bgcolor: "#FEF2F2", color: "#DC2626", textColor: "#991B1B" },
    Pending: { bgcolor: "#FEF3C7", color: "#D97706", textColor: "#B45309" },
  };

  const statusStyle = statusColors[application.status] || statusColors.Pending;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 180ms ease",
        "&:hover": {
          borderColor: "#BFDBFE",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Header: Avatar, Name, Email, Status */}
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1.5}
          mb={2}
        >
          <Box display="flex" gap={1.5} flex={1} minWidth={0}>
            <Avatar
              sx={{
                bgcolor: "#2563EB",
                fontWeight: 800,
                width: 40,
                height: 40,
                flexShrink: 0,
              }}
            >
              {application.fullName?.charAt(0).toUpperCase()}
            </Avatar>

            <Box minWidth={0}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ fontSize: "0.95rem", lineHeight: 1.2, color: "#0F172A" }}
                noWrap
              >
                {application.fullName}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "0.8rem",
                  color: "#64748B",
                  mt: 0.25,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {application.email}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={application.status || "Pending"}
            sx={{
              bgcolor: statusStyle.bgcolor,
              color: statusStyle.textColor,
              fontWeight: 700,
              fontSize: "0.75rem",
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Applied For */}
        <Box mb={1.75}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Position
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#334155",
              fontWeight: 600,
              mt: 0.5,
            }}
          >
            {application.job?.title || "Not specified"}
          </Typography>
        </Box>

        {/* Resume */}
        <Box mb={1.75}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Resume
          </Typography>

          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#2563EB",
              fontWeight: 600,
              mt: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            {application.resume || "Not uploaded"}
          </Typography>
        </Box>

        {/* Applied On */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Applied On
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#64748B",
              mt: 0.5,
            }}
          >
            {new Date(application.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.25} pt={2} sx={{ borderTop: "1px solid #F1F5F9" }}>
        <Button
          variant="contained"
          onClick={() => onShortlist(application._id)}
          sx={{
            flex: 1,
            minHeight: 44,
            backgroundColor: "#047857",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            borderRadius: 2,
            transition: "all 160ms ease",
            boxShadow: "0 2px 8px rgba(4, 120, 87, 0.15)",
            "&:hover": {
              backgroundColor: "#059669",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)",
            },
          }}
        >
          Accept
        </Button>

        <Button
          variant="outlined"
          onClick={() => onReject(application._id)}
          sx={{
            flex: 1,
            minHeight: 44,
            borderColor: "#FCA5A5",
            color: "#DC2626",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#FEF2F2",
            transition: "all 160ms ease",
            "&:hover": {
              borderColor: "#F87171",
              bgcolor: "#FEE2E2",
              color: "#991B1B",
            },
          }}
        >
          Reject
        </Button>
      </Stack>
    </Paper>
  );
}