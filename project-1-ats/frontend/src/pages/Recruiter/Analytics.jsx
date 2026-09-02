import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";

import StatsCard from "../../components/Analytics/StatsCard";
import AnalyticsChart from "../../components/Analytics/AnalyticsChart";

import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [jobsRes, applicationsRes] = await Promise.all([
          api.get("/jobs"),
          api.get("/applications"),
        ]);

        const jobs = jobsRes.data.data;
        const applications = applicationsRes.data.applications;

        setStats({
          totalJobs: jobs.length,
          totalApplications: applications.length,
          pending: applications.filter(
            (app) => app.status === "Pending"
          ).length,
          accepted: applications.filter(
            (app) => app.status === "Accepted"
          ).length,
          rejected: applications.filter(
            (app) => app.status === "Rejected"
          ).length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h4" fontWeight={800} mb={1}>
          Analytics Dashboard
        </Typography>
        <Typography color="text.secondary" mb={3}>Track your hiring funnel and understand where candidates are moving.</Typography>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Total Jobs"
              value={stats.totalJobs}
              icon={<WorkIcon />}
              color="#2563EB"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Applications"
              value={stats.totalApplications}
              icon={<GroupIcon />}
              color="#7C3AED"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={<PendingActionsIcon />}
              color="#F59E0B"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <StatsCard
              title="Accepted"
              value={stats.accepted}
              icon={<CheckCircleIcon />}
              color="#10B981"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <StatsCard
              title="Rejected"
              value={stats.rejected}
              icon={<CancelIcon />}
              color="#EF4444"
            />
          </Grid>
        </Grid>

        {/* Pie Chart */}
        <Box
          sx={{
            mt: 4,
            p: 4,
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={3}>
  Application Analytics
</Typography>
          <AnalyticsChart stats={stats} />
        </Box>
      </Box>
    </>
  );
}
