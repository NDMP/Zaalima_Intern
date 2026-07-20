import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  LinearProgress,
  TextField,
  Grid,
  Card,
  CardContent,
  Drawer,
Avatar,
Divider,
IconButton,
Button,
Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import { getToken } from "../../utils/auth";

export default function AIScreening() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [selectedCandidate, setSelectedCandidate] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

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
    } catch (err) {
      console.error(err);
    }
  };

  const fetchScreening = async (jobId) => {
    try {
      const token = getToken();

      const res = await axios.get(
        `http://localhost:5000/api/ai-screening/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCandidates(res.data.candidates);
    } catch (err) {
      console.error(err);
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "warning";
    return "error";
  };

  const filteredCandidates = candidates.filter((candidate) => {
  const matchesSearch =
    candidate.fullName.toLowerCase().includes(search.toLowerCase()) ||
    candidate.email.toLowerCase().includes(search.toLowerCase()) ||
    (candidate.skills || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    candidate.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const totalCandidates = candidates.length;

const strongMatches = candidates.filter(
  (candidate) => candidate.matchPercentage >= 80
).length;

const goodMatches = candidates.filter(
  (candidate) =>
    candidate.matchPercentage >= 50 &&
    candidate.matchPercentage < 80
).length;

const weakMatches = candidates.filter(
  (candidate) => candidate.matchPercentage < 50
).length;

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

    fetchScreening(selectedJob);

    setSelectedCandidate((prev) => ({
      ...prev,
      status,
    }));
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
      <Sidebar />
      <Topbar />

      <Box
        sx={{
          ml: "260px",
          mt: "90px",
          p: 4,
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={4}>
          AI Screening
        </Typography>

        {/* Job Selection */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select Job</InputLabel>

            <Select
              value={selectedJob}
              label="Select Job"
              onChange={(e) => {
                setSelectedJob(e.target.value);
                fetchScreening(e.target.value);
              }}
            >
              {jobs.map((job) => (
                <MenuItem key={job._id} value={job._id}>
                  {job.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Box
  sx={{
    display: "flex",
    gap: 2,
    mb: 3,
    mt: 3,
    flexWrap: "wrap",
  }}
>

<Grid container spacing={3} sx={{ mt: 2, mb: 3 }}>

  <Grid item xs={12} md={3}>
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          Total Candidates
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          👥 {totalCandidates}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          Strong Match
        </Typography>

        <Typography
          variant="h4"
          color="success.main"
          fontWeight="bold"
        >
          🟢 {strongMatches}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          Good Match
        </Typography>

        <Typography
          variant="h4"
          color="warning.main"
          fontWeight="bold"
        >
          🟡 {goodMatches}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          Weak Match
        </Typography>

        <Typography
          variant="h4"
          color="error.main"
          fontWeight="bold"
        >
          🔴 {weakMatches}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

</Grid>
  
  <TextField
    label="Search Candidate"
    placeholder="Name, Email or Skills"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{ minWidth: 300 }}
  />

  <FormControl sx={{ minWidth: 180 }}>
    <InputLabel>Status</InputLabel>

    <Select
      value={statusFilter}
      label="Status"
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="Accepted">Accepted</MenuItem>
      <MenuItem value="Rejected">Rejected</MenuItem>
    </Select>
  </FormControl>
</Box>

        {/* Candidate Table */}
        {selectedJob && (
          <Paper
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Candidate Rankings
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Candidate</b>
                  </TableCell>

                  <TableCell>
                    <b>Match %</b>
                  </TableCell>

                  <TableCell>
                    <b>Recommendation</b>
                  </TableCell>

                  <TableCell>
                    <b>Matched Skills</b>
                  </TableCell>

                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
  <b>Resume</b>
</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {candidates.length > 0 ? (
                  filteredCandidates.map((candidate, index) => (
                    <TableRow
  key={candidate._id}
  hover
  onClick={() => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  }}
  sx={{
    cursor: "pointer",
    backgroundColor: index === 0 ? "#E8F5E9" : "inherit",
    "&:hover": {
      backgroundColor: index === 0 ? "#D7F4DC" : "#F5F5F5",
    },
  }}
>
                    <TableCell>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >
    <Typography fontWeight={600}>
      {candidate.fullName}
    </Typography>

    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {index === 0 && (
        <Chip
          label="🏆 Top Match"
          color="success"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      )}

      {candidate.matchPercentage >= 80 && (
        <Chip
          label="⭐ AI Recommended"
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      )}
    </Box>
  </Box>
</TableCell>

                      <TableCell sx={{ width: 220 }}>
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress
                            variant="determinate"
                            value={candidate.matchPercentage}
                            color={getProgressColor(
                              candidate.matchPercentage
                            )}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                            }}
                          />

                          <Typography
                            variant="caption"
                            sx={{
                              mt: 0.5,
                              display: "block",
                              fontWeight: 600,
                            }}
                          >
                            {candidate.matchPercentage}%
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
  label={candidate.recommendation}
  color={
    candidate.recommendation === "Strong Match"
      ? "success"
      : candidate.recommendation === "Good Match"
      ? "warning"
      : "error"
  }
  sx={{
    fontWeight: 700,
    minWidth: 120,
  }}
/>
                      </TableCell>

                      <TableCell>
                        {candidate.matchedSkills.length > 0
                          ? candidate.matchedSkills.join(", ")
                          : "-"}
                      </TableCell>

                      <>
  <TableCell>
    <Chip
      label={candidate.status}
      color={
        candidate.status === "Accepted"
          ? "success"
          : candidate.status === "Rejected"
          ? "error"
          : "warning"
      }
      variant="outlined"
    />
  </TableCell>

  <TableCell>
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Button
        size="small"
        variant="contained"
        onClick={() =>
          window.open(
            `http://localhost:5000/uploads/${candidate.resume}`,
            "_blank"
          )
        }
      >
        View
      </Button>

      <Button
        size="small"
        variant="outlined"
        component="a"
        href={`http://localhost:5000/uploads/${candidate.resume}`}
        download
      >
        Download
      </Button>
    </Box>
    
  </TableCell>
</>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No candidates match your search or filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
        <Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
>
  {selectedCandidate && (
    <Box
      sx={{
        width: 420,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Candidate Profile
        </Typography>

        <IconButton
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        <Box textAlign="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              bgcolor: "primary.main",
              fontSize: 30,
            }}
          >
            {selectedCandidate.fullName[0]}
          </Avatar>

          <Typography
            variant="h6"
            mt={2}
          >
            {selectedCandidate.fullName}
          </Typography>
        </Box>

        <Divider />

        <Typography>
          <EmailIcon
            sx={{ mr: 1 }}
          />
          {selectedCandidate.email}
        </Typography>

        <Typography>
          <PhoneIcon
            sx={{ mr: 1 }}
          />
          {selectedCandidate.phone}
        </Typography>

        <Typography>
          <WorkIcon
            sx={{ mr: 1 }}
          />
          {selectedCandidate.skills || "No Skills"}
        </Typography>

        <Typography>
          🌐 {selectedCandidate.portfolio || "No Portfolio"}
        </Typography>

        <Typography>
          Match Score:
          {" "}
          <b>
            {selectedCandidate.matchPercentage}%
          </b>
        </Typography>

        <Chip
          label={selectedCandidate.recommendation}
          color={
            selectedCandidate.recommendation ===
            "Strong Match"
              ? "success"
              : selectedCandidate.recommendation ===
                "Good Match"
              ? "warning"
              : "error"
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
  fullWidth
  variant="contained"
  color="success"
  onClick={() =>
    updateStatus(selectedCandidate._id, "Accepted")
  }
>
  Accept
</Button>

          <Button
  fullWidth
  variant="contained"
  color="error"
  onClick={() =>
    updateStatus(selectedCandidate._id, "Rejected")
  }
>
  Reject
</Button>
        </Box>

        <Button
          fullWidth
          startIcon={<DescriptionIcon />}
          variant="outlined"
          onClick={() =>
            window.open(
              `http://localhost:5000/uploads/${selectedCandidate.resume}`,
              "_blank"
            )
          }
        >
          View Resume
        </Button>
      </Stack>
    </Box>
  )}
</Drawer>
      </Box>
    </>
  );
}