import { useEffect, useState } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import CompanySettings from "../../components/Settings/CompanySettings";
import api from "../../utils/api";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import SecuritySettings from "../../components/Settings/SecuritySettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import { getToken, saveAuthSession } from "../../utils/auth";
import ProfileCompletionCard from "../../components/Settings/ProfileCompletionCard";

export default function Settings() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    companyName: "",
    designation: "",
    website: "",
    address: "",
    updatedAt: "",
    description: "",
    notifications: {
      emailOnApplication: true,
      aiScreeningComplete: true,
      interviewReminder: true,
      weeklySummary: false,
    },
  });

  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get("/settings");

      setUser({
        name: data.user.name,
        updatedAt: data.user.updatedAt,
        email: data.user.email,
        companyName: data.user.recruiterProfile.companyName,
        designation: data.user.recruiterProfile.designation,
        website: data.user.recruiterProfile.website || "",
        address: data.user.recruiterProfile.address || "",
        description: data.user.recruiterProfile.description || "",
        notifications:
          data.user.recruiterProfile.notifications || {
            emailOnApplication: true,
            aiScreeningComplete: true,
            interviewReminder: true,
            weeklySummary: false,
          },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveSettings = async () => {
    try {
      const { data } = await api.put("/settings", user);

      saveAuthSession({
        token: getToken(),
        user: data.user,
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Profile updated successfully!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update profile.",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            fontSize: { xs: "1.75rem", md: "2rem" },
            color: "#0F172A",
            mb: 0.5,
          }}
        >
          Settings
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ color: "#64748B" }}
        >
          Keep your recruiter profile, company information, and notifications up to date.
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          mb: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              bgcolor: "#2563EB",
              height: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#64748B",
              transition: "all 160ms ease",
              "&.Mui-selected": {
                color: "#2563EB",
              },
            },
          }}
        >
          <Tab label="Profile" />
          <Tab label="Company" />
          <Tab label="Security" />
          <Tab label="Notifications" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tab === 0 && (
        <>
          <ProfileCompletionCard user={user} />
          <Box sx={{ mt: 2.5 }}>
            <ProfileSettings
              user={user}
              setUser={setUser}
              saveSettings={saveSettings}
            />
          </Box>
        </>
      )}

      {tab === 1 && (
        <CompanySettings
          user={user}
          setUser={setUser}
          saveSettings={saveSettings}
        />
      )}

      {tab === 2 && <SecuritySettings />}

      {tab === 3 && (
        <NotificationSettings
          user={user}
          setUser={setUser}
          saveSettings={saveSettings}
        />
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
