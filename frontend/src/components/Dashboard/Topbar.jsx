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
import { getUser } from "../../utils/auth";

export default function Topbar() {
  const user = getUser();
  const displayName = user?.name || "Recruiter";
  const displayRole = user?.role || "recruiter";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "calc(100% - 260px)",
        ml: "260px",
<<<<<<< HEAD
        bgcolor: "rgba(255,255,255,0.9)",
        color: "#0F172A",
        borderBottom: "1px solid #E5E7EB",
        backdropFilter: "blur(16px)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
=======
        bgcolor: "#FFFFFF",
        color: "#0F172A",
        borderBottom: "1px solid #E5E7EB",
>>>>>>> origin/main
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
<<<<<<< HEAD
            py: 0.75,
            borderRadius: "999px",
            width: 350,
            border: "1px solid #E2E8F0",
=======
            py: 0.5,
            borderRadius: "12px",
            width: 350,
>>>>>>> origin/main
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
              {displayName[0] || "R"}
            </Avatar>

            <Box>
              <Typography
                fontWeight={700}
                fontSize={15}
              >
                {displayName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {displayRole[0].toUpperCase() + displayRole.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}