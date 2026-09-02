import {
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "TalentFlow Labs",
    salary: { min: 800000, max: 1200000 },
    location: "Mumbai",
    type: "Full-time",
    experience: "2-4 years",
    status: "Active",
    applicants: 8,
    aiScreening: true,
    posted: "5 days ago",
  },
  {
    title: "DevOps Engineer",
    company: "TalentFlow Labs",
    salary: { min: 1000000, max: 1500000 },
    location: "Hyderabad",
    type: "Full-time",
    experience: "3-5 years",
    status: "Active",
    applicants: 12,
    aiScreening: true,
    posted: "1 week ago",
  },
];

export default function RecentJobs({ jobs = sampleJobs }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: "#0F172A", fontSize: "1.1rem" }}
        >
          Recent Jobs
        </Typography>
        <Typography
          component="a"
          href="/recruiter/jobs"
          sx={{
            fontSize: "0.85rem",
            color: "#2563EB",
            fontWeight: 700,
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 160ms ease",
            "&:hover": {
              color: "#1D4ED8",
              textDecoration: "underline",
            },
          }}
        >
          View all jobs
        </Typography>
      </Box>

      {jobs && jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Box
            key={`${job.title}-${index}`}
            sx={{
              py: 1.75,
              px: 0.5,
              borderBottom: index !== jobs.length - 1 ? "1px solid #F1F5F9" : "none",
              transition: "all 160ms ease",
              borderRadius: 1.5,
              "&:hover": {
                bgcolor: "#F8FAFC",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: "#EFF6FF",
                    color: "#2563EB",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {job.title.slice(0, 2).toUpperCase()}
                </Box>
                <Box minWidth={0}>
                  <Typography fontWeight={700} sx={{ fontSize: "1.05rem", color: "#0F172A" }} noWrap>
                    {job.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748B", display: "block", mt: 0.15, fontSize: "0.8rem" }} noWrap>
                    {job.company}
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                INR {job.salary.min.toLocaleString()} - INR {job.salary.max.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5, mb: 1.25, color: "#475569" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <LocationOnIcon sx={{ fontSize: "0.95rem" }} />
                <Typography sx={{ fontSize: "0.8rem" }}>{job.location}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <WorkIcon sx={{ fontSize: "0.95rem" }} />
                <Typography sx={{ fontSize: "0.8rem" }}>{job.type}</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.8rem" }}>{job.experience}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label={job.status}
                  size="small"
                  sx={{
                    bgcolor: "#ECFDF5",
                    color: "#047857",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: 1,
                  }}
                />
                <Typography sx={{ fontSize: "0.77rem", color: "#475569" }}>{job.applicants} Applicants</Typography>
                {job.aiScreening && (
                  <Chip
                    label="AI Screening On"
                    size="small"
                    sx={{
                      bgcolor: "#F3E8FF",
                      color: "#7C3AED",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>

              <Typography sx={{ fontSize: "0.75rem", color: "#64748B" }}>{job.posted}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
          No recent jobs
        </Typography>
      )}
    </Paper>
  );
}
