import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import api from "../../utils/api";
import { toast } from "react-toastify";

export default function ApplicantJobCard({ job }) {

  const [saved, setSaved] = useState(false);

  useEffect(() => {
  checkSaved();
}, []);

const checkSaved = async () => {
  try {
    const res = await api.get("/jobs/saved");

    const found = res.data.jobs.find(
      (item) => item._id === job._id
    );

    setSaved(!!found);
  } catch (err) {
    console.log(err);
  }
};

const toggleSaveJob = async () => {
  console.log(job);
  try {
    if (saved) {
      await api.delete(`/jobs/${job._id}/save`);

      setSaved(false);
      window.dispatchEvent(new Event("saved-jobs-updated"));

      toast.success("Removed from Saved Jobs");
    } else {
      await api.post(`/jobs/${job._id}/save`);

      setSaved(true);
      window.dispatchEvent(new Event("saved-jobs-updated"));

      toast.success("Job Saved");
    }
  } catch (err) {
  console.log(err.response?.data);
  console.log(err);
  toast.error(err.response?.data?.message || "Something went wrong");
}
};
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
        p: { xs: 1.75, sm: 2 },
        borderRadius: 2,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
        transition: "all 180ms ease",
        "&:hover": {
          borderColor: "#BFDBFE",
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Header: Title & Company */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "#0F172A",
            fontWeight: 800,
            fontSize: "1rem",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            minWidth: 0,
            overflowWrap: "anywhere",
            marginBottom: 0.5,
          }}
        >
          {job.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            minWidth: 0,
            overflowWrap: "anywhere",
            color: "#64748B",
            fontSize: "0.9rem",
            marginBottom: 1.25,
          }}
        >
          {job.company}
        </Typography>

        {/* Metadata Grid: Location, Type, Mode, Salary */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            marginBottom: 1.25,
          }}
        >
          {/* Location with Icon */}
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon
              sx={{
                color: "#2563EB",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 500,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {job.location || "Not specified"}
            </Typography>
          </Box>

          {/* Employment Type with Icon */}
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessCenterIcon
              sx={{
                color: "#2563EB",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 500,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {job.employmentType || "Not specified"}
            </Typography>
          </Box>

          {/* Salary with Icon */}
          <Box display="flex" alignItems="center" gap={1}>
            <CurrencyRupeeIcon
              sx={{
                color: "#2563EB",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 600,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {job.minSalary} - {job.maxSalary}
            </Typography>
          </Box>

          {/* Work Mode Badge */}
          <Box>
            <Chip
              label={job.workMode || "Flexible"}
              sx={{
                bgcolor: "#E2E8F0",
                color: "#1E293B",
                fontWeight: 700,
                borderRadius: 1.5,
                fontSize: "0.72rem",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Skills Section */}
      <Box sx={{ my: 1.25 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 1,
          }}
        >
          Required Skills
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#475569",
            lineHeight: 1.45,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {job.skills || "Not specified"}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.25,
          width: "100%",
          alignItems: "center",
          pt: 1.25,
          borderTop: "1px solid #F1F5F9",
        }}
      >
        <Button
          component={Link}
          to={`/applicant/jobs/${job._id}`}
          variant="contained"
          sx={{
            flex: 1,
            minHeight: 44,
            px: 2.5,
            py: 1.25,
            borderRadius: 2,
            bgcolor: "#2563EB",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            boxShadow: "0 4px 10px rgba(23, 59, 120, 0.22)",
            transition: "all 160ms ease",
            "&:hover": {
              bgcolor: "#1D4ED8",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 14px rgba(23, 59, 120, 0.28)",
            },
          }}
        >
          View Details
        </Button>

        <IconButton
          onClick={toggleSaveJob}
          aria-label={saved ? "Remove saved job" : "Save job"}
          sx={{
            color: saved ? "#DC2626" : "#94A3B8",
            minHeight: 44,
            minWidth: 44,
            transition: "all 160ms ease",
            "&:hover": {
              color: "#DC2626",
              bgcolor: "#FEF2F2",
            },
          }}
        >
          {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
}
