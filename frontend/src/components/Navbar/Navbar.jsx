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
} from "@mui/material";

import {
  SmartToy,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Features", path: "#features" },
    { title: "How It Works", path: "#how-it-works" },
    { title: "Pricing", path: "#pricing" },
    { title: "Contact", path: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
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
              AI ATS
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
              variant="outlined"
              sx={{
                borderRadius: 50,
              }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 50,
              }}
            >
              Get Started
            </Button>
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
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
}