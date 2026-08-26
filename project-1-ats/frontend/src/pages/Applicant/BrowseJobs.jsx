import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import ApplicantJobCard from "../../components/ApplicantDashboard/ApplicantJobCard";
import axios from "axios";
import { getToken } from "../../utils/auth";

export default function BrowseJobs() {
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

    setJobs(res.data.data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchJobs();
}, []);

  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase());

      const matchesWorkMode =
        workMode === "" || job.workMode === workMode;

      const matchesEmploymentType =
        employmentType === "" ||
        job.employmentType === employmentType;

      return (
        matchesSearch &&
        matchesWorkMode &&
        matchesEmploymentType
      );
    });
  }, [jobs, search, workMode, employmentType]);

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        background: "#F8FAFC",
        minHeight: "100%",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        textAlign: "left",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Browse Jobs
      </Typography>

      {/* Search & Filters */}

      <Grid container spacing={2} mb={4} sx={{ width: "100%", minWidth: 0 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
          <TextField
            fullWidth
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#BFDBFE" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563EB" } }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0 }}>
          <TextField
            select
            fullWidth
            label="Work Mode"
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#BFDBFE" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563EB" } }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
            <MenuItem value="On-site">On-site</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0 }}>
          <TextField
            select
            fullWidth
            label="Employment Type"
            value={employmentType}
            onChange={(e) =>
              setEmploymentType(e.target.value)
            }
            sx={{ "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#BFDBFE" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563EB" } }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Jobs */}

      <Grid container spacing={3} sx={{ width: "100%", minWidth: 0 }}>
        {filteredJobs.length === 0 ? (
          <Grid size={12}>
            <Typography
              textAlign="center"
              color="text.secondary"
              mt={8}
            >
              No jobs found.
            </Typography>
          </Grid>
        ) : (
          filteredJobs.map((job) => (
            <Grid
              key={job._id}
              size={{ xs: 12, sm: 6, lg: 4 }}
              sx={{ minWidth: 0, display: "flex" }}
            >
              <ApplicantJobCard job={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
