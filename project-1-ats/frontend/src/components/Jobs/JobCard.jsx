import { Paper, Typography, Box, Avatar, Chip, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useContext, useState } from "react";
import { JobContext } from "../../context/JobContext";

export default function JobCard({ job, refreshJobs }) {
  const navigate = useNavigate();
  const { setEditingJob } = useContext(JobContext);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const skills = (job.skills || "Not specified")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const salary = `INR ${Number(job.minSalary || 0).toLocaleString("en-IN")} - INR ${Number(job.maxSalary || 0).toLocaleString("en-IN")}`;

  const deleteJob = async () => {
    setMenuAnchor(null);
    if (!window.confirm(`Delete ${job.title}?`)) return;
    try {
      await api.delete(`/jobs/${job._id}`);
      refreshJobs();
    } catch (error) {
      console.error(error);
      window.alert("Delete failed");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.75, sm: 2 },
        width: "100%",
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        transition: "all 180ms ease",
        "&:hover": {
          borderColor: "#BFDBFE",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1.25}
          mb={1.5}
        >
          <Box display="flex" gap={1.5} flex={1} minWidth={0}>
            <Avatar
              sx={{
                bgcolor: "#2563EB",
                fontWeight: 800,
                width: 40,
                height: 40,
                flexShrink: 0,
              }}
            >
              {(job.title || "J").charAt(0).toUpperCase()}
            </Avatar>

            <Box minWidth={0} flex={1}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.25,
                  color: "#0F172A",
                  letterSpacing: "-0.01em",
                }}
                noWrap
              >
                {job.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "0.8rem",
                  color: "#64748B",
                  mt: 0.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {job.company || "Company not specified"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
            <Chip label={job.workMode || "Flexible"} size="small" sx={{ bgcolor: "#ECFDF5", color: "#047857", fontWeight: 700, fontSize: "0.68rem", borderRadius: 1 }} />
            <IconButton aria-label={`Actions for ${job.title}`} onClick={(event) => setMenuAnchor(event.currentTarget)} size="small" sx={{ color: "#64748B" }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
              <MenuItem onClick={() => { setMenuAnchor(null); setEditingJob(job); navigate("/recruiter/jobs/create"); }}>Edit job</MenuItem>
              <MenuItem onClick={deleteJob} sx={{ color: "#DC2626" }}>Delete job</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1, mb: 1.25 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            <WorkIcon sx={{ color: "#2563EB", fontSize: "1rem", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.78rem", color: "#334155", fontWeight: 600 }} noWrap>
              {job.employmentType || "Not specified"}{job.experience ? ` | ${job.experience}` : ""}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            <LocationOnIcon sx={{ color: "#2563EB", fontSize: "1rem", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.78rem", color: "#334155" }} noWrap>{job.location || "Not specified"}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            <CurrencyRupeeIcon sx={{ color: "#2563EB", fontSize: "1rem", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#334155", fontWeight: 600 }} noWrap>{salary}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
            <PsychologyIcon sx={{ color: "#2563EB", fontSize: "1rem", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.78rem", color: "#334155" }} noWrap>{job.aiScreening ? "AI enabled" : "AI off"}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <Typography
          variant="subtitle2"
          fontWeight={700}
          mb={0.75}
          sx={{ color: "#0F172A", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
        >
          Key Skills
        </Typography>

        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                bgcolor: "#EFF6FF",
                color: "#1E3A8A",
                fontWeight: 700,
                fontSize: "0.72rem",
                borderRadius: 1,
                border: "1px solid #BFDBFE",
                height: 24,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
