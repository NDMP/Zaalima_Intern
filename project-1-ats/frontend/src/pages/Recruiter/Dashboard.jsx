import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import Grid from "@mui/material/Grid";
import StatCard from "../../components/Dashboard/StatCard";

import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RecentApplicants from "../../components/Dashboard/RecentApplicants";
import QuickActions from "../../components/Dashboard/QuickActions";
import { getUser } from "../../utils/auth";

export default function Dashboard() {
  const user = getUser();
  const recruiterProfile = user?.recruiterProfile || {};

  return (
    <>
      <Sidebar />

      <Topbar />

      <div
        style={{
          marginLeft: "260px",
          marginTop: "72px",
          padding: "30px",
        }}
      >
        <>
  <h1
    style={{
      marginBottom: "30px",
    }}
  >
    Recruiter Dashboard - {user?.name || "Recruiter"}
  </h1>

  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={3}>
      <StatCard
        title="Open Jobs"
        value={recruiterProfile.openJobs ?? 0}
        icon={<WorkIcon />}
        color="#2563EB"
      />
      <RecentApplicants applicants={recruiterProfile.recentApplicants || []} />
      <QuickActions />
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
      <StatCard
        title="Applicants"
        value={recruiterProfile.applicants ?? 0}
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
</>
      </div>
    </>
  );
}