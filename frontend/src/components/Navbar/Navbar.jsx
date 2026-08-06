import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
<<<<<<< HEAD
  Container,
} from "@mui/material";

import { SmartToy, Menu as MenuIcon } from "@mui/icons-material";
=======
} from "@mui/material";

import {
  SmartToy,
  Menu as MenuIcon,
} from "@mui/icons-material";

>>>>>>> origin/main
import { Link, useNavigate } from "react-router-dom";
import { clearAuthSession, getUser } from "../../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAuthSession();
    navigate("/choose-role", { replace: true });
  };

  useEffect(() => {
<<<<<<< HEAD
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
=======
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

>>>>>>> origin/main
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Features", path: "#features" },
    { title: "How It Works", path: "#how-it-works" },
<<<<<<< HEAD
=======
    { title: "Pricing", path: "#pricing" },
>>>>>>> origin/main
    { title: "Contact", path: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
<<<<<<< HEAD
        elevation={0}
        sx={{
          zIndex: 1300,
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid transparent",
          transition: "all 250ms ease",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ justifyContent: "space-between", py: 1, px: { xs: 2, md: 4 } }}>
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#0F172A" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(37, 99, 235, 0.12)" }}>
                <SmartToy color="primary" sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                TalentFlow
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.title}
                  component="a"
                  href={link.path}
                  sx={{ color: "#475569", fontWeight: 600, fontSize: "0.95rem", transition: "color 250ms ease", "&:hover": { color: "#2563EB" } }}
                >
                  {link.title}
                </Typography>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
              <Button component={Link} to={user ? `/${user.role}/dashboard` : "/choose-role"} variant="contained" sx={{ borderRadius: 10, px: 2.25, py: 1 }}>
                {user ? "Dashboard" : "Login"}
              </Button>
              {user ? (
                <Button onClick={handleLogout} variant="text" sx={{ color: "#0F172A", borderRadius: 10, px: 1.5 }}>
                  Logout
                </Button>
              ) : null}
            </Box>

            <IconButton sx={{ display: { md: "none" } }} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Typography variant="h6" fontWeight={800} mb={2}>
            Explore
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} component="a" href={link.path} onClick={() => setMobileOpen(false)}>
=======
        color="transparent"
        elevation={scrolled ? 4 : 0}
        sx={{
            zIndex: 1300,
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "0.3s",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#0F172A",
            }}
          >
            <SmartToy
              color="primary"
              sx={{
                mr: 1,
                fontSize: 34,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              TalentFlow
            </Typography>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 4,
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.title}
                component="a"
                href={link.path}
                sx={{
                  textDecoration: "none",
                  color: "#475569",
                  fontWeight: 500,
                  cursor: "pointer",

                  "&:hover": {
                    color: "#2563EB",
                  },
                }}
              >
                {link.title}
              </Typography>
            ))}
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 2,
            }}
          >
           

            <Button
  component={Link}
  to={user ? `/${user.role}/dashboard` : "/choose-role"}
  variant="contained"
  sx={{
    borderRadius: 50,
  }}
>
  {user ? "Dashboard" : "Login"}
</Button>

            {user ? (
              <Button
                onClick={handleLogout}
                variant="text"
                sx={{ borderRadius: 50 }}
              >
                Logout
              </Button>
            ) : null}
          </Box>

          <IconButton
            sx={{
              display: {
                md: "none",
              },
            }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.title}
                component="a"
                href={link.path}
              >
>>>>>>> origin/main
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
<<<<<<< HEAD
          <Button fullWidth variant="contained" component={Link} to={user ? `/${user.role}/dashboard` : "/choose-role"} onClick={() => setMobileOpen(false)} sx={{ mt: 2, borderRadius: 10 }}>
            {user ? "Open Dashboard" : "Get Started"}
=======

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Get Started
>>>>>>> origin/main
          </Button>
        </Box>
      </Drawer>
    </>
  );
}