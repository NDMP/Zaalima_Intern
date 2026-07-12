import { Box, Grid } from "@mui/material";

import WelcomeBanner from "../../components/ApplicantDashboard/WelcomeBanner";
import QuickActions from "../../components/ApplicantDashboard/QuickActions";
import ApplicantStatCard from "../../components/ApplicantDashboard/ApplicantStatCard";
import RecommendedJobs from "../../components/ApplicantDashboard/RecommendedJobs";
import AIInsights from "../../components/ApplicantDashboard/AIInsights";
import ProfileCard from "../../components/ApplicantDashboard/ProfileCard";

export default function ApplicantDashboard() {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Applied Jobs"
            value={12}
            color="#2563EB"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Interviews"
            value={3}
            color="#7C3AED"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Saved Jobs"
            value={8}
            color="#10B981"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Offers"
            value={1}
            color="#F59E0B"
          />
        </Grid>
      </Grid>

      {/* Recommended Jobs */}
      <RecommendedJobs />

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <AIInsights />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <ProfileCard />
        </Grid>
      </Grid>
    </Box>
  );
}