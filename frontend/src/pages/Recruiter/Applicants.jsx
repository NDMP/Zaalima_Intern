import { useContext } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import ApplicantCard from "../../components/Recruiter/ApplicantCard";
import { ApplicationContext } from "../../context/ApplicationContext";

export default function Applicants() {
  const { applications, setApplications } =
    useContext(ApplicationContext);

  const updateStatus = (id, status) => {
    const updated = applications.map((app) =>
      app.id === id
        ? { ...app, status }
        : app
    );

    setApplications(updated);
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
                key={application.id}
                size={{ xs: 12, md: 6 }}
              >
                <ApplicantCard
                  application={application}
                  onShortlist={(id) =>
                    updateStatus(id, "Shortlisted")
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