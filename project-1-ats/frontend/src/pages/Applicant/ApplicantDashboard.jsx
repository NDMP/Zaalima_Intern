import { Box, Grid } from "@mui/material";

import WelcomeBanner from "../../components/ApplicantDashboard/WelcomeBanner";
import ApplicantStatCard from "../../components/ApplicantDashboard/ApplicantStatCard";
import RecommendedJobs from "../../components/ApplicantDashboard/RecommendedJobs";
import AIInsights from "../../components/ApplicantDashboard/AIInsights";
import ProfileCard from "../../components/ApplicantDashboard/ProfileCard";
import { getUser } from "../../utils/auth";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import UpcomingInterviewCard from "../../components/ApplicantDashboard/UpcomingInterviewCard";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function ApplicantDashboard() {
  const user = getUser();
  const applicantProfile = user?.applicantProfile || {};
  const [savedJobsCount, setSavedJobsCount] = useState(applicantProfile.savedJobs ?? 0);
  useEffect(() => {
  fetchUpcomingInterview();
  fetchSavedJobsCount();
  window.addEventListener("saved-jobs-updated", fetchSavedJobsCount);
  return () => window.removeEventListener("saved-jobs-updated", fetchSavedJobsCount);
}, []);

const fetchSavedJobsCount = async () => {
  try {
    const res = await api.get("/jobs/saved");
    setSavedJobsCount(res.data.jobs?.length ?? 0);
  } catch (error) {
    console.log(error);
  }
};

const fetchUpcomingInterview = async () => {
  console.log("Fetching interview...");

  try {
    const res = await api.get("/applications/my-interview");

    console.log(res.data);

    setUpcomingInterview(res.data.interview);
  } catch (error) {
    console.log(error);
  }
};
  const [upcomingInterview, setUpcomingInterview] = useState(null);

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

      <UpcomingInterviewCard
  interview={upcomingInterview}
/>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Applied Jobs"
            value={applicantProfile.appliedJobs ?? 0}
            color="#2563EB"
            icon={<WorkIcon sx={{ fontSize: 34 }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Interviews"
            value={applicantProfile.interviews ?? 0}
            color="#7C3AED"
            icon={<EventIcon sx={{ fontSize: 34 }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Saved Jobs"
            value={savedJobsCount}
            color="#10B981"
            icon={<FavoriteBorderIcon sx={{ fontSize: 34 }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ApplicantStatCard
            title="Offers"
            value={applicantProfile.offers ?? 0}
            color="#F59E0B"
            icon={<LocalOfferIcon sx={{ fontSize: 34 }} />}
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
