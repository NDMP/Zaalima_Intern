import { useEffect, useState } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import CompanySettings from "../../components/Settings/CompanySettings";
import api from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
useEffect(() => {
  fetchSettings();
}, []);
const [snackbar, setSnackbar] = useState({
  open: false,
  severity: "success",
  message: "",
});

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
    <>
      <Sidebar />
      <Topbar />

      <Box
        sx={{
          ml: "260px",
          mt: "72px",
          p: 4,
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
  Settings
</Typography>
<Tabs
  value={tab}
  onChange={(e, value) => setTab(value)}
  sx={{ mb: 3 }}
>
  <Tab label="Profile" />
  <Tab label="Security" />
  <Tab label="Company" />
  <Tab label="Notifications" />
</Tabs>

{tab === 0 && (
  <>
    <ProfileCompletionCard user={user} />

    <ProfileSettings
      user={user}
      setUser={setUser}
      saveSettings={saveSettings}
    />
  </>
)}

{tab === 1 && (
  <SecuritySettings />
)}

{tab === 2 && (
  <CompanySettings
    user={user}
    setUser={setUser}
    saveSettings={saveSettings}
  />
)}

{tab === 3 && (
  <NotificationSettings
    user={user}
    setUser={setUser}
    saveSettings={saveSettings}
  />
)}
      </Box>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() =>
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </>
  );
}