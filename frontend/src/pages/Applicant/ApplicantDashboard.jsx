import { Box, Grid } from "@mui/material";

import WelcomeBanner from "../../components/ApplicantDashboard/WelcomeBanner";
import QuickActions from "../../components/ApplicantDashboard/QuickActions";
import ApplicantStatCard from "../../components/ApplicantDashboard/ApplicantStatCard";
import RecommendedJobs from "../../components/ApplicantDashboard/RecommendedJobs";
import AIInsights from "../../components/ApplicantDashboard/AIInsights";
import ProfileCard from "../../components/ApplicantDashboard/ProfileCard";
import { getUser } from "../../utils/auth";

export default function ApplicantDashboard() {
  const user = getUser();
  const applicantProfile = user?.applicantProfile || {};

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Welcome Banner */}
      <WelcomeBanner
        name={user?.name || "Applicant"}
        profileCompletion={applicantProfile.profileCompletion ?? 0}
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Applied Jobs"
            value={applicantProfile.appliedJobs ?? 0}
            color="#2563EB"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Interviews"
            value={applicantProfile.interviews ?? 0}
            color="#7C3AED"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Saved Jobs"
            value={applicantProfile.savedJobs ?? 0}
            color="#10B981"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Offers"
            value={applicantProfile.offers ?? 0}
            color="#F59E0B"
          />
        </Grid>
      </Grid>

      {/* Recommended Jobs */}
      <RecommendedJobs />

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <AIInsights insights={applicantProfile.aiInsights || []} />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <ProfileCard
            name={user?.name || "Applicant"}
            field={applicantProfile.field || "Software Development"}
            profileCompletion={applicantProfile.profileCompletion ?? 0}
          />
        </Grid>
      </Grid>
    </Box>
  );
}