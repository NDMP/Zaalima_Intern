import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import JobCard from "../../components/Jobs/JobCard";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";
export default function Jobs() {
  const [jobs, setJobs] = useState([]);

const fetchJobs = async () => {
  try {
    const token = getToken();

    const res = await axios.get(
      "http://localhost:5000/api/jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);

    setJobs(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchJobs();
}, []);
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

  {jobs.length === 0 ? (
  <Box
    sx={{
      textAlign: "center",
      mt: 8,
      color: "text.secondary",
    }}
  >
    <h2>No Jobs Posted Yet</h2>
    <p>Click "Create Job" to publish your first job.</p>
  </Box>
) : (
  jobs.map((job) => (
  <Box key={job._id} sx={{ mb: 3 }}>
    <JobCard
  job={job}
  refreshJobs={fetchJobs}
/>
  </Box>
))
)}
</>
      </div>
    </>
  );
}