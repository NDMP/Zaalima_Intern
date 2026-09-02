import {
  Button,
  Paper,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
} from "@mui/material";
import BellIcon from "@mui/icons-material/Notifications";

export default function NotificationSettings({
  user,
  setUser,
  saveSettings,
}) {
  const handleToggle = (key) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: !user.notifications[key],
      },
    });
  };

  const notificationOptions = [
    {
      key: "emailOnApplication",
      label: "Email on New Application",
      description: "Get notified when a new applicant applies for your job postings",
    },
    {
      key: "aiScreeningComplete",
      label: "AI Screening Complete",
      description: "Receive notifications when AI screening is completed for applications",
    },
    {
      key: "interviewReminder",
      label: "Interview Reminder",
      description: "Get reminders for upcoming interviews and scheduled meetings",
    },
    {
      key: "weeklySummary",
      label: "Weekly Summary",
      description: "Receive a weekly summary of your hiring pipeline and key metrics",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "#FEF3C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D97706",
          }}
        >
          <BellIcon />
        </Box>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: "#0F172A" }}
        >
          Notification Settings
        </Typography>
      </Box>

      {/* Form Content */}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "0.85rem",
            }}
          >
            Control how and when you receive notifications about your hiring activities.
          </Typography>
        </Box>

        {/* Notification Options */}
        <Box>
          {notificationOptions.map((option, index) => (
            <Box key={option.key}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#0F172A",
                      fontSize: "0.9rem",
                      mb: 0.5,
                    }}
                  >
                    {option.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748B",
                      fontSize: "0.8rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {option.description}
                  </Typography>
                </Box>
                <Switch
                  checked={user.notifications[option.key] || false}
                  onChange={() => handleToggle(option.key)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#2563EB",
                      "&:hover": {
                        backgroundColor: "rgba(23, 59, 120, 0.08)",
                      },
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#2563EB",
                    },
                  }}
                />
              </Box>
              {index < notificationOptions.length - 1 && (
                <Divider sx={{ my: 0.5, bgcolor: "#E2E8F0" }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={saveSettings}
          sx={{
            mt: 3,
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            backgroundColor: "#2563EB",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(23, 59, 120, 0.15)",
            transition: "all 160ms ease",
            "&:hover": {
              backgroundColor: "#1D4ED8",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(23, 59, 120, 0.25)",
            },
          }}
        >
          Save Notification Preferences
        </Button>
      </Box>
    </Paper>
  );
}