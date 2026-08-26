import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import StatCard from "../../components/Dashboard/StatCard";

import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RecentApplicants from "../../components/Dashboard/RecentApplicants";
import RecentJobs from "../../components/Dashboard/RecentJobs";

export default function Dashboard() {
  const stats = [
    { title: "Total Jobs", value: 12, detail: "5 active", icon: <WorkIcon sx={{ fontSize: "1.2rem" }} />, color: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)" },
    { title: "Total Applicants", value: 48, detail: "12 this week", icon: <GroupIcon sx={{ fontSize: "1.2rem" }} />, color: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)" },
    { title: "Interviews Scheduled", value: 7, detail: "3 today", icon: <CalendarTodayIcon sx={{ fontSize: "1.1rem" }} />, color: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)" },
    { title: "Offers Extended", value: 5, detail: "2 this week", icon: <CheckCircleIcon sx={{ fontSize: "1.2rem" }} />, color: "linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)" },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 0.5, color: "#0F172A", fontSize: { xs: "1.9rem", md: "2.2rem" } }}
        >
          Welcome back, Zaalima! 👋
        </Typography>
        <Typography sx={{ color: "#64748B", fontSize: "1rem" }}>
          Here&apos;s what&apos;s happening with your hiring pipeline.
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {stats.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
            <StatCard
              title={item.title}
              value={item.value}
              detail={item.detail}
              icon={item.icon}
              color={item.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <RecentJobs />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <RecentApplicants />
        </Grid>
      </Grid>
    </Box>
  );
}
