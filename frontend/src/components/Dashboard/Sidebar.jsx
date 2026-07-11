import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Jobs",
    icon: <WorkIcon />,
  },
  {
    title: "Applicants",
    icon: <GroupIcon />,
  },
  {
    title: "AI Screening",
    icon: <SmartToyIcon />,
  },
  {
    title: "Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            p: 3,
            color: "#fff",
          }}
        >
          TalentFlow
        </Typography>

        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={item.title}
              selected={index === 0}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,

                "&.Mui-selected": {
                  bgcolor: "#2563EB",
                },

                "&:hover": {
                  bgcolor: "#1E293B",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,

            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#fff",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}