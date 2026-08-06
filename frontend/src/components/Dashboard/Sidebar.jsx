import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../utils/auth";
import EventIcon from "@mui/icons-material/Event";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/recruiter/dashboard",
  },
  {
    title: "Jobs",
    icon: <WorkIcon />,
    path: "/recruiter/jobs",
  },
  {
    title: "Applicants",
    icon: <GroupIcon />,
    path: "/recruiter/applicants",
  },
  {
  title: "AI Screening",
  icon: <SmartToyIcon />,
  path: "/recruiter/ai-screening",
},
{
  title: "Analytics",
  icon: <AnalyticsIcon />,
  path: "/recruiter/analytics",
},

{
  title: "Interviews",
  icon: <EventIcon />,
  path: "/recruiter/interviews",
},

{
  title: "Settings",
  icon: <SettingsIcon />,
  path: "/recruiter/settings",
},
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/choose-role", { replace: true });
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "24px 0 60px rgba(15, 23, 42, 0.18)",
      }}
    >
      <Box>
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography variant="h5" fontWeight={800}>
            TalentFlow
          </Typography>
          <Chip label="Recruiter HQ" size="small" sx={{ mt: 1.5, bgcolor: "rgba(37,99,235,0.18)", color: "#BFDBFE", borderRadius: "999px" }} />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2, mb: 1 }} />

        <List sx={{ px: 1.5 }}>
          {menuItems.map((item) => (
            <ListItemButton
              component={item.path ? Link : "button"}
              {...(item.path ? { to: item.path } : {})}
              key={item.title}
              selected={location.pathname === item.path}
              disabled={!item.path}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                px: 1.5,
                py: 1,
                color: "#E2E8F0",
                "&.Mui-selected": {
                  bgcolor: "rgba(37, 99, 235, 0.2)",
                  color: "#fff",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.07)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            px: 1.5,
            py: 1,
            color: "#E2E8F0",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}