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
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
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

      toast.success("Removed from Saved Jobs");
    } else {
      await api.post(`/jobs/${job._id}/save`);

      setSaved(true);

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
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        transition: ".3s",
        "&:hover": {
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {job.title}
      </Typography>

      <Typography color="text.secondary" mt={1}>
        {job.company}
      </Typography>

      <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
        <Chip
          icon={<LocationOnIcon />}
          label={job.location}
          variant="outlined"
        />

        <Chip
          icon={<BusinessCenterIcon />}
          label={job.employmentType}
          color="primary"
        />

        <Chip
          label={job.workMode}
          color="success"
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
        }}
      >
        <CurrencyRupeeIcon fontSize="small" />

        <Typography fontWeight={600}>
          {job.minSalary} - {job.maxSalary}
        </Typography>
      </Box>

      <Typography
        color="text.secondary"
        mt={2}
      >
        {job.skills}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
  component={Link}
  to={`/applicant/jobs/${job._id}`}
  variant="contained"
>
  View Details
</Button>

        <IconButton
  color="error"
  onClick={toggleSaveJob}
>
  {saved ? (
    <FavoriteIcon />
  ) : (
    <FavoriteBorderIcon />
  )}
</IconButton>
      </Box>
    </Paper>
  );
}  