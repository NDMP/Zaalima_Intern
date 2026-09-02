import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Paper, Chip, Stack, Button } from "@mui/material";
import axios from "axios";
import { getToken } from "../../utils/auth";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setJob(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <Box sx={{ maxWidth: 980, mx: "auto", py: 8, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#64748B" }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 980, mx: "auto" }}>
      <Button component={Link} to="/applicant/jobs" sx={{ mb: 2, px: 0, color: "#2563EB", fontWeight: 700, "&:hover": { bgcolor: "transparent", color: "#1D4ED8" } }}>
        &lt; Back to Browse Jobs
      </Button>
      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 4, md: 5 }, borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(15,23,42,.06)" }}>
        <Typography variant="h4" sx={{ color: "#0F172A", fontWeight: 800, lineHeight: 1.2 }}>{job.title}</Typography>
        <Typography color="text.secondary" mt={1} sx={{ fontSize: "1.05rem" }}>{job.company}</Typography>

        <Stack direction="row" spacing={1.25} mt={3} flexWrap="wrap" useFlexGap>
          <Chip label={job.location} sx={{ fontWeight: 500 }} />
          <Chip label={job.workMode} color="success" sx={{ fontWeight: 500 }} />
          <Chip label={job.employmentType} color="primary" sx={{ fontWeight: 500 }} />
        </Stack>

        <Typography mt={4} sx={{ color: "#0F172A", fontWeight: 800 }}>Salary</Typography>
        <Typography color="#334155" fontWeight={700}>INR {job.minSalary} - INR {job.maxSalary}</Typography>

        <Typography mt={4} sx={{ color: "#0F172A", fontWeight: 800 }}>Skills</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>{job.skills || "Not specified"}</Typography>

        <Typography mt={4} sx={{ color: "#0F172A", fontWeight: 800 }}>Job Description</Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>{job.description || "Not specified"}</Typography>

        <Typography mt={4} sx={{ color: "#0F172A", fontWeight: 800 }}>Requirements</Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>{job.requirements || "Not specified"}</Typography>

        <Typography mt={4} sx={{ color: "#0F172A", fontWeight: 800 }}>Benefits</Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>{job.benefits || "Not specified"}</Typography>

        <Button component={Link} to={`/applicant/jobs/${job._id}/apply`} variant="contained" sx={{ mt: 4, minHeight: 48, px: 3, borderRadius: 2.5, bgcolor: "#2563EB", fontWeight: 700, boxShadow: "0 4px 10px rgba(23,59,120,.22)", "&:hover": { bgcolor: "#1D4ED8", boxShadow: "0 6px 14px rgba(23,59,120,.28)" } }}>
          Apply Now
        </Button>
      </Paper>
    </Box>
  );
}
