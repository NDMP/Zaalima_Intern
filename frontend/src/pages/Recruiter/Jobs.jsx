import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import JobCard from "../../components/Jobs/JobCard";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
export default function Jobs() {
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
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 4,
    }}
  >
    <h1>Jobs</h1>

   <Button
  component={Link}
  to="/recruiter/jobs/create"
  variant="contained"
>
  + Create Job
</Button>
  </Box>

  <JobCard />
</>
      </div>
    </>
  );
}