import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Button,
  TextField,
  IconButton,
  Badge,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import { getToken, getUser } from "../../utils/auth";

const Card = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 4,
      boxShadow: 3,
      transition: ".3s",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
    <Avatar sx={{ bgcolor: color, mb: 2 }}>{icon}</Avatar>

    <Typography color="text.secondary">{title}</Typography>

    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
);

export default function Dashboard() {
  const user = getUser();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      const res = await axios.get(
        "http://localhost:5000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data.applications.slice(0, 5));
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <Topbar />

      <Box
        sx={{
          ml: "260px",
          mt: "72px",
          p: 4,
          background: "#F4F7FC",
          minHeight: "100vh",
        }}
      >
        {/* Header */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Welcome Back 👋
            </Typography>

            <Typography color="text.secondary">
              {user?.name}
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />

            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* KPI */}

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={3}>
            <Card
              title="Open Jobs"
              value={8}
              color="#2563EB"
              icon={<WorkIcon />}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              title="Applicants"
              value={applications.length}
              color="#7C3AED"
              icon={<GroupIcon />}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              title="AI Match"
              value="92%"
              color="#10B981"
              icon={<SmartToyIcon />}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              title="Hired"
              value={3}
              color="#F59E0B"
              icon={<CheckCircleIcon />}
            />
          </Grid>
        </Grid>

        {/* Main */}

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Latest Applicants
              </Typography>

              {applications.map((app) => (
                <Box key={app._id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={2}
                  >
                    <Box display="flex" gap={2} alignItems="center">
                      <Avatar>
                        {app.applicant?.name?.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography fontWeight="bold">
                          {app.applicant?.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {app.job?.title}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" gap={2} alignItems="center">
                      <Chip
                        label={app.status}
                        color={
                          app.status === "Accepted"
                            ? "success"
                            : app.status === "Rejected"
                            ? "error"
                            : "warning"
                        }
                      />

                      <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                  </Box>

                  <Divider />
                </Box>
              ))}

              <Box textAlign="center" mt={3}>
                <Button variant="contained">
                  View All Applicants
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Quick Actions
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                + Post Job
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                View Applicants
              </Button>

              <Button
                fullWidth
                variant="outlined"
              >
                AI Resume Screening
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}