import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession, getUser } from "../../utils/auth";

const items = [
  { label: "Dashboard", path: "/applicant/dashboard", icon: <DashboardIcon /> },
  { label: "Browse Jobs", path: "/applicant/jobs", icon: <WorkIcon /> },
  { label: "My Applications", path: "/applicant/my-applications", icon: <AssignmentIcon /> },
  { label: "Saved Jobs", path: "/applicant/saved-jobs", icon: <FavoriteBorderIcon /> },
];

export default function ApplicantSidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const handleLogout = () => { clearAuthSession(); navigate("/choose-role", { replace: true }); };
  const isActive = (path) => location.pathname === path || (path === "/applicant/jobs" && location.pathname.startsWith("/applicant/jobs/"));
  return <Box sx={{ height: "100%", minHeight: "100vh", bgcolor: "#0B132B", color: "#fff", display: "flex", flexDirection: "column", overflowY: "auto" }}>
    <Box sx={{ px: 2.5, pt: 2.75, pb: 2.25 }}><Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}><Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: "#2563EB", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "1.1rem" }}>T</Box><Typography sx={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-.03em" }}>TalentFlow</Typography></Box><Typography sx={{ color: "#94A3B8", fontSize: ".72rem", mt: 1, pl: .25 }}>Applicant workspace</Typography></Box>
    <Divider sx={{ borderColor: "rgba(148,163,184,.16)" }} />
    <Typography sx={{ px: 2.75, pt: 2.5, pb: 1, color: "#64748B", fontSize: ".66rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>My workspace</Typography>
    <List sx={{ px: 1.25, py: 0 }}>{items.map((item) => { const active = isActive(item.path); return <ListItemButton key={item.path} component={Link} to={item.path} onClick={onNavigate} selected={active} sx={{ minHeight: 46, mb: .5, px: 1.5, borderRadius: 2, color: active ? "#fff" : "#B8C3D6", transition: ".2s", "& .MuiListItemIcon-root": { minWidth: 38, color: "inherit" }, "& .MuiListItemText-primary": { fontSize: ".88rem", fontWeight: active ? 750 : 500 }, "&.Mui-selected": { bgcolor: "#1D4ED8", boxShadow: "0 8px 18px rgba(29,78,216,.25)" }, "&.Mui-selected:hover": { bgcolor: "#1D4ED8" }, "&:hover": { bgcolor: active ? "#1D4ED8" : "#17233A", color: "#fff" } }}>{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}<ListItemText primary={item.label} /></ListItemButton>; })}</List>
    <Typography sx={{ px: 2.75, pt: 2.25, pb: 1, color: "#64748B", fontSize: ".66rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>Account</Typography>
    <List sx={{ px: 1.25, py: 0 }}><ListItemButton component={Link} to="/applicant/profile" onClick={onNavigate} selected={location.pathname === "/applicant/profile"} sx={{ minHeight: 46, px: 1.5, borderRadius: 2, color: "#B8C3D6", "& .MuiListItemIcon-root": { minWidth: 38, color: "inherit" }, "&.Mui-selected": { bgcolor: "#1D4ED8", color: "#fff" }, "&:hover": { bgcolor: "#17233A", color: "#fff" } }}><ListItemIcon><PersonIcon /></ListItemIcon><ListItemText primary="Profile" /></ListItemButton></List>
    <Box sx={{ mt: "auto", p: 1.5 }}><Box sx={{ p: 1.5, mb: 1, borderRadius: 2.5, bgcolor: "rgba(148,163,184,.08)" }}><Typography noWrap sx={{ color: "#E2E8F0", fontSize: ".8rem", fontWeight: 700 }}>{user?.name || "Applicant"}</Typography><Typography noWrap sx={{ color: "#64748B", fontSize: ".7rem", mt: .25 }}>{user?.applicantProfile?.field || "Career seeker"}</Typography></Box><ListItemButton onClick={handleLogout} sx={{ minHeight: 44, px: 1.5, borderRadius: 2, color: "#B8C3D6", "& .MuiListItemIcon-root": { minWidth: 38, color: "inherit" }, "&:hover": { bgcolor: "#3B1F2B", color: "#FCA5A5" } }}><ListItemIcon><LogoutIcon /></ListItemIcon><ListItemText primary="Sign out" /></ListItemButton></Box>
  </Box>;
}
