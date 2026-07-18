import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import ApplicantCard from "../../components/Recruiter/ApplicantCard";
import axios from "axios";
import { getToken } from "../../utils/auth";

export default function Applicants() {
  const [applications, setApplications] = useState([]);

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

      setApplications(res.data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  fetchApplications();
}, []);

  const updateStatus = async (id, status) => {
  try {
    const token = getToken();

    await axios.patch(
      `http://localhost:5000/api/applications/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status } : app
      )
    );
  } catch (error) {
    console.error(error);
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
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Applicants
        </Typography>

        {applications.length === 0 ? (
          <Typography color="text.secondary">
            No applications received yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {applications.map((application) => (
              <Grid
                key={application._id}
                size={{ xs: 12, md: 6 }}
              >
                <ApplicantCard
                  application={application}
                  onShortlist={(id) =>
  updateStatus(id, "Accepted")
}
                  onReject={(id) =>
                    updateStatus(id, "Rejected")
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}