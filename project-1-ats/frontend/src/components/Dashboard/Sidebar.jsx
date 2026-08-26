import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession, getUser } from "../../utils/auth";

const menuItems = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/recruiter/dashboard" },
  { title: "Jobs", icon: <WorkIcon />, path: "/recruiter/jobs" },
  { title: "Applicants", icon: <GroupIcon />, path: "/recruiter/applicants" },
  { title: "AI Screening", icon: <SmartToyIcon />, path: "/recruiter/ai-screening" },
  { title: "Analytics", icon: <AnalyticsIcon />, path: "/recruiter/analytics" },
  { title: "Interviews", icon: <EventIcon />, path: "/recruiter/interviews" },
];

export default function Sidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/choose-role", { replace: true });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#0B132B",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Logo & Branding */}
      <Box sx={{ px: 2.5, pt: 2.75, pb: 2.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 2,
              bgcolor: "#2563EB",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            T
          </Box>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-.03em" }}>
            TalentFlow
          </Typography>
        </Box>
        <Typography sx={{ color: "#94A3B8", fontSize: ".7rem", fontWeight: 500 }}>
          Recruiter workspace
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(148,163,184,.16)", my: 0 }} />

      {/* Workspace Navigation */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          sx={{
            px: 0.75,
            pb: 1.25,
            color: "#64748B",
            fontSize: ".66rem",
            fontWeight: 800,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          Workspace
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path === "/recruiter/jobs" && location.pathname.startsWith("/recruiter/jobs/"));
            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={onNavigate}
                selected={active}
                sx={{
                  minHeight: 44,
                  mb: 0.5,
                  px: 1.5,
                  borderRadius: 2,
                  color: active ? "#fff" : "#B8C3D6",
                  transition: "all 160ms ease",
                  "& .MuiListItemIcon-root": {
                    minWidth: 38,
                    color: "inherit",
                  },
                  "& .MuiListItemText-primary": {
                    fontSize: ".88rem",
                    fontWeight: active ? 700 : 500,
                  },
                  "&.Mui-selected": {
                    bgcolor: "#1D4ED8",
                    boxShadow: "0 6px 16px rgba(37,99,235,.22)",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "#1D4ED8",
                  },
                  "&:hover": {
                    bgcolor: active ? "#1D4ED8" : "#17233A",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Account Section */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          sx={{
            px: 0.75,
            pb: 1.25,
            color: "#64748B",
            fontSize: ".66rem",
            fontWeight: 800,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          Account
        </Typography>
        <List sx={{ p: 0 }}>
          <ListItemButton
            component={Link}
            to="/recruiter/settings"
            onClick={onNavigate}
            selected={location.pathname === "/recruiter/settings"}
            sx={{
              minHeight: 44,
              px: 1.5,
              borderRadius: 2,
              color: "#B8C3D6",
              transition: "all 160ms ease",
              "& .MuiListItemIcon-root": {
                minWidth: 38,
                color: "inherit",
              },
              "&.Mui-selected": {
                bgcolor: "#1D4ED8",
                color: "#fff",
              },
              "&:hover": {
                bgcolor: "#1A2844",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>

      {/* Profile & Logout Section */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Box
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 2,
            bgcolor: "rgba(148,163,184,.08)",
            border: "1px solid rgba(148,163,184,.12)",
          }}
        >
          <Typography
            noWrap
            sx={{
              color: "#E2E8F0",
              fontSize: ".8rem",
              fontWeight: 700,
            }}
          >
            {user?.name || "Recruiter"}
          </Typography>
          <Typography
            noWrap
            sx={{
              color: "#94A3B8",
              fontSize: ".7rem",
              mt: 0.5,
              fontWeight: 500,
            }}
          >
            {user?.recruiterProfile?.companyName || "TalentFlow"}
          </Typography>
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            minHeight: 44,
            px: 1.5,
            borderRadius: 2,
            color: "#B8C3D6",
            transition: "all 160ms ease",
            "& .MuiListItemIcon-root": {
              minWidth: 38,
              color: "inherit",
            },
            "&:hover": {
              bgcolor: "#3B1F2B",
              color: "#FCA5A5",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
