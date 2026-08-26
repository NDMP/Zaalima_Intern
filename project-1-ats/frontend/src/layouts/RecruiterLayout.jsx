import { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import Footer from "../components/footer/footer";
import api from "../utils/api";
import { getUser } from "../utils/auth";

const SIDEBAR_WIDTH = 260;
export default function RecruiterLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  useEffect(() => { api.get("/settings").then(({ data }) => setUser(data.user)).catch(() => {}); }, []);
  return <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", display: "flex", overflowX: "hidden" }}>
    <Box component="aside" sx={{ display: { xs: "none", md: "block" }, position: "fixed", inset: "0 auto 0 0", width: SIDEBAR_WIDTH, zIndex: 1200 }}><Sidebar /></Box>
    <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: "none" } }}><Box sx={{ width: SIDEBAR_WIDTH, height: "100%", bgcolor: "#0B132B" }}><Sidebar onNavigate={() => setMobileOpen(false)} /></Box></Drawer>
    <Box sx={{ flex: 1, minWidth: 0, ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` }, display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(255,255,255,.94)", color: "#0F172A", borderBottom: "1px solid #E2E8F0", backdropFilter: "blur(12px)" }}><Toolbar sx={{ minHeight: { xs: 60, md: 72 }, px: { xs: 1.5, sm: 3, lg: 5 }, gap: 1.5 }}>
        <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, color: "#2563EB" }} aria-label="Open navigation"><MenuIcon /></IconButton>
        <Box sx={{ flex: 1 }}><Typography sx={{ fontWeight: 800 }}>Recruiter workspace</Typography><Typography sx={{ display: { xs: "none", sm: "block" }, color: "#64748B", fontSize: ".75rem" }}>Manage talent with clarity</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}><Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}><Typography sx={{ fontSize: ".86rem", fontWeight: 700 }}>{user?.name || "Recruiter"}</Typography><Typography sx={{ color: "#64748B", fontSize: ".72rem" }}>Recruiter</Typography></Box><Avatar sx={{ width: 38, height: 38, bgcolor: "#DBEAFE", color: "#2563EB", fontWeight: 800 }}>{user?.name?.[0]?.toUpperCase() || "R"}</Avatar></Box>
      </Toolbar></AppBar>
      <Box component="main" sx={{ flex: 1, width: "100%", minWidth: 0, px: { xs: 1.5, sm: 3, lg: 5 }, py: { xs: 2, md: 3 }, boxSizing: "border-box" }}><Outlet /></Box><Footer compact workspace="Recruiter workspace" />
    </Box>
  </Box>;
}
