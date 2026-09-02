import { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import ApplicantSidebar from "../components/ApplicantDashboard/ApplicantSidebar";
import Footer from "../components/footer/footer";
import api from "../utils/api";
import { getUser } from "../utils/auth";

const SIDEBAR_WIDTH = 250;

export default function ApplicantLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerUser, setHeaderUser] = useState(getUser());
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setHeaderUser(data.user)).catch(() => {});
  }, []);

  const imageUrl = `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "")}/uploads`;

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", ml: "calc(50% - 50vw)", bgcolor: "#F8FAFC", display: "flex", overflowX: "hidden", boxSizing: "border-box" }}>
      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: SIDEBAR_WIDTH,
          zIndex: 1200,
          bgcolor: "#0F172A",
          color: "#fff",
        }}
      >
        <Box sx={{ position: "sticky", top: 0, height: "100vh" }}>
          <ApplicantSidebar />
        </Box>
      </Box>

      <Drawer open={mobileOpen} onClose={closeMobile} sx={{ display: { md: "none" } }}>
        <Box sx={{ width: SIDEBAR_WIDTH, height: "100%", bgcolor: "#0F172A" }}>
          <ApplicantSidebar onNavigate={closeMobile} />
        </Box>
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0, width: { xs: "100%", md: `calc(100% - ${SIDEBAR_WIDTH}px)` }, ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` }, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ bgcolor: "rgba(255,255,255,.94)", color: "#0F172A", borderBottom: "1px solid #E2E8F0", backdropFilter: "blur(10px)" }}
        >
          <Toolbar sx={{ minHeight: { xs: 58, md: 64 }, px: { xs: 2, sm: 4, lg: 5 } }}>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, mr: 1, color: "#2563EB" }} aria-label="Open navigation">
              <MenuIcon />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: "#334155", fontSize: { xs: "0.95rem", sm: "1rem" }, fontWeight: 700 }}>
                Applicant workspace
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}>
                <Typography sx={{ color: "#0F172A", fontSize: "0.86rem", fontWeight: 700, lineHeight: 1.2 }}>
                  {headerUser?.name || "Applicant"}
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: "0.72rem", mt: 0.25 }}>Applicant</Typography>
              </Box>
              <Avatar src={headerUser?.applicantProfile?.profileImage ? `${imageUrl}/${headerUser.applicantProfile.profileImage}` : ""} sx={{ width: 38, height: 38, bgcolor: "#DBEAFE", color: "#2563EB", fontWeight: 800 }}>
                {headerUser?.name?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flex: 1, minWidth: 0, width: "100%", px: { xs: 1.5, sm: 3, lg: 5 }, py: { xs: 2, md: 3 }, boxSizing: "border-box" }}>
          <Outlet />
        </Box>
        <Footer compact workspace="Applicant workspace" />
      </Box>
    </Box>
  );
}
