import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

import ApplicantCard from "../../components/Recruiter/ApplicantCard";
import api from "../../utils/api";

export default function Applicants() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications");
        setApplications(res.data.applications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/applications/${id}/status`, { status });

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
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ fontSize: { xs: "1.75rem", md: "2rem" }, color: "#0F172A", mb: 0.5 }}
        >
          Applicants
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ color: "#64748B" }}
        >
          Review, shortlist, and manage every candidate in one place.
        </Typography>
      </Box>

      {/* Applicants Grid */}
      {applications.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            color: "text.secondary",
          }}
        >
          <Typography
            sx={{
              color: "#334155",
              fontWeight: 600,
            }}
          >
            No applications received yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {applications.map((application) => (
            <Grid
              key={application._id}
              item
              xs={12}
              md={6}
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
  );
}
