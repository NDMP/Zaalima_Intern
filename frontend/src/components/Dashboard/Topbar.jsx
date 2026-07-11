import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "calc(100% - 260px)",
        ml: "260px",
        bgcolor: "#FFFFFF",
        color: "#0F172A",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "72px",
        }}
      >
        {/* Search Bar */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F8FAFC",
            px: 2,
            py: 0.5,
            borderRadius: "12px",
            width: 350,
          }}
        >
          <SearchIcon sx={{ color: "#64748B", mr: 1 }} />

          <InputBase
            placeholder="Search applicants..."
            sx={{ width: "100%" }}
          />
        </Box>

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#2563EB",
              }}
            >
              A
            </Avatar>

            <Box>
              <Typography
                fontWeight={700}
                fontSize={15}
              >
                Ankur Ojha
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Recruiter
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}