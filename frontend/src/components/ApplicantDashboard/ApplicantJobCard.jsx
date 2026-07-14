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

export default function ApplicantJobCard({ job }) {
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
  to={`/applicant/jobs/${job.id}`}
  variant="contained"
>
  View Details
</Button>

        <Button
          variant="outlined"
          startIcon={<BookmarkBorderIcon />}
        >
          Save Job
        </Button>
      </Box>
    </Paper>
  );
}