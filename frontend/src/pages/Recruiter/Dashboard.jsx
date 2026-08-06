import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import StatCard from "../../components/Dashboard/StatCard";
import QuickActions from "../../components/Dashboard/QuickActions";

import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

import { getUser, getToken } from "../../utils/auth";

export default function Dashboard() {
  const user = getUser();
  const recruiterProfile = user?.recruiterProfile || {};

  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <>
      <Sidebar />

      <Topbar />

      <Box
        sx={{
          ml: "260px",
          mt: "72px",
          p: 4,
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={4}>
          Recruiter Dashboard - {user?.name || "Recruiter"}
        </Typography>

        {/* Top Cards */}

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Open Jobs"
              value={recruiterProfile.openJobs ?? 0}
              icon={<WorkIcon />}
              color="#2563EB"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Applicants"
              value={recruiterProfile.applicants ?? applications.length}
              icon={<GroupIcon />}
              color="#7C3AED"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="AI Match"
              value={`${recruiterProfile.aiMatch ?? 0}%`}
              icon={<SmartToyIcon />}
              color="#10B981"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Hired"
              value={recruiterProfile.hired ?? 0}
              icon={<CheckCircleIcon />}
              color="#F59E0B"
            />
          </Grid>
        </Grid>

        {/* Bottom Section */}

        <Grid container spacing={3}>
          {/* Latest Applicants */}

          <Grid item xs={12} lg={8}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Latest Applicants
              </Typography>

              {applications.length === 0 ? (
                <Typography color="text.secondary">
                  No applications received yet.
                </Typography>
              ) : (
                applications.map((app, index) => (
                  <Box key={app._id}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "#2563EB",
                            mr: 2,
                          }}
                        >
                          <PersonIcon />
                        </Avatar>

                        <Box>
                          <Typography fontWeight={600}>
                            {app.applicant?.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {app.applicant?.email}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="primary"
                          >
                            {app.job?.title}
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        label={app.status}
                        color={getStatusColor(app.status)}
                      />
                    </Box>

                    {index !== applications.length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))
              )}

              <Box
                display="flex"
                justifyContent="center"
                mt={3}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/recruiter/applicants")}
                >
                  View All Applicants
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Actions */}

          <Grid item xs={12} lg={4}>
            <QuickActions />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}