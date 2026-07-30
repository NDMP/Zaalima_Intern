import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Accordion,
AccordionSummary,
AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import api from "../../utils/api";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const UPLOADS_URL = API_URL.replace(/\/api\/?$/, "/uploads");

const getMatchColor = (percentage) => {
  if (percentage >= 80) return "success";
  if (percentage >= 50) return "warning";
  return "error";
};

const getRecommendationConfig = (recommendation) => {
  if (recommendation === "Shortlist") {
    return { color: "success", label: "🟢 Shortlist" };
  }

  if (recommendation === "Review") {
    return { color: "warning", label: "🟠 Review" };
  }

  return { color: "error", label: "🔴 Do Not Shortlist" };
};

const getScreeningErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 403) {
    return "You are not authorized to view AI Screening results.";
  }

  if (status === 404) {
    return "Job not found.";
  }

  return "Something went wrong. Please try again.";
};

function SkillChips({ skills = [], color = "default" }) {
  if (!skills.length) {
    return <Typography color="text.secondary">-</Typography>;
  }

  return (
    <Box display="flex" gap={0.75} flexWrap="wrap">
      {skills.map((skill) => (
        <Chip key={skill} label={skill} size="small" color={color} />
      ))}
    </Box>
  );
}

function MatchScore({ percentage }) {
  return (
    <Box sx={{ minWidth: 160 }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getMatchColor(percentage)}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography variant="caption" fontWeight={700} mt={0.5} display="block">
        {percentage}% AI Match
      </Typography>
    </Box>
  );
}

export default function AIScreening() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [screeningLoading, setScreeningLoading] = useState(false);
  const [screeningError, setScreeningError] = useState("");
  const [questions, setQuestions] = useState(null);
const [loadingQuestions, setLoadingQuestions] = useState(false);  

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setJobsLoading(true);

    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data);
    } catch (error) {
      setScreeningError(getScreeningErrorMessage(error));
    } finally {
      setJobsLoading(false);
    }
  };

  const fetchScreening = async (jobId) => {
    if (!jobId) {
      return;
    }

    setScreeningLoading(true);
    setScreeningError("");

    try {
      const res = await api.get(`/ai-screening/${jobId}`);
      setCandidates(res.data.candidates);
    } catch (error) {
      setCandidates([]);
      setScreeningError(getScreeningErrorMessage(error));
    } finally {
      setScreeningLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/applications/${id}/status`, { status });

      setSelectedCandidate((prev) =>
        prev ? { ...prev, status } : prev
      );
      fetchScreening(selectedJob);
    } catch (error) {
      setScreeningError("Something went wrong. Please try again.");
    }
  };

  const handleJobChange = (jobId) => {
    setSelectedJob(jobId);
    setCandidates([]);
    setSelectedCandidate(null);
    setDrawerOpen(false);
    fetchScreening(jobId);
  };

  const handleGenerateQuestions = async (job) => {
  try {
    setLoadingQuestions(true);

    const res = await api.post("/ai-interview/generate", {
      title: job.title,
      skills: job.skills,
      description: job.description,
    });

    setQuestions(res.data.questions);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingQuestions(false);
  }
};
const handleSaveQuestions = async () => {
  try {
    await api.put(`/ai-interview/${selectedJob}`, {
      questions,
    });

    toast.success("Interview questions saved successfully!");
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Failed to save interview questions"
    );
  }
};

const downloadPDF = () => {
  const doc = new jsPDF();

  let y = 20;

  const job = jobs.find((j) => j._id === selectedJob);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("TalentFlow Interview Kit", 20, y);

  y += 15;

  doc.setDrawColor(0);
  doc.line(20, y, 190, y);

  y += 12;

  doc.setFontSize(14);
  doc.text(`Job Title: ${job?.title || "-"}`, 20, y);

  y += 10;

  doc.text(`Company: ${job?.company || "-"}`, 20, y);

  y += 10;

  doc.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    20,
    y
  );

  y += 15;

  Object.entries(questions).forEach(([section, list]) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(section.toUpperCase(), 20, y);

    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    list.forEach((question, index) => {
      const lines = doc.splitTextToSize(
        `${index + 1}. ${question}`,
        165
      );

      doc.text(lines, 25, y);

      y += lines.length * 7 + 3;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 8;
  });

  doc.setFontSize(10);
  doc.text(
    "Generated by TalentFlow AI",
    20,
    285
  );

  doc.save(
    `${job?.title || "Interview"}_Questions.pdf`
  );
};

  const filteredCandidates = candidates.filter((candidate) => {
    const query = search.toLowerCase();
    const matchesSearch =
      candidate.fullName.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      (candidate.skills || "").toLowerCase().includes(query) ||
      (candidate.candidateSkills || [])
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const shortlistCount = candidates.filter(
    (candidate) => candidate.recommendation === "Shortlist"
  ).length;
  const reviewCount = candidates.filter(
    (candidate) => candidate.recommendation === "Review"
  ).length;
  const doNotShortlistCount = candidates.filter(
    (candidate) => candidate.recommendation === "Do Not Shortlist"
  ).length;

  const getResumeUrl = (resume) => `${UPLOADS_URL}/${resume}`;

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

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {jobsLoading ? (
            <Skeleton variant="rounded" height={56} />
          ) : (
            <FormControl fullWidth>
              <InputLabel>Select Job</InputLabel>
              <Select
                value={selectedJob}
                label="Select Job"
                onChange={(event) => handleJobChange(event.target.value)}
              >
                {jobs.map((job) => (
                  <MenuItem key={job._id} value={job._id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Paper>

        <Box
  sx={{
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <Button
    variant="contained"
    disabled={!selectedJob || loadingQuestions}
    onClick={() => {
      const job = jobs.find((j) => j._id === selectedJob);

      if (job) {
        handleGenerateQuestions(job);
      }
    }}
  >
    {loadingQuestions
      ? "Generating..."
      : "Generate AI Interview Questions"}
  </Button>
</Box>

{questions && (
  <Paper sx={{ mt: 3, p: 3, borderRadius: 3 }}>
    <Typography
      variant="h5"
      fontWeight={700}
      mb={3}
    >
      AI Interview Questions
    </Typography>
    <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    mb: 3,
  }}
>
  <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mb: 3,
  }}
>
  <Button
    variant="contained"
    color="success"
    onClick={handleSaveQuestions}
  >
    Save Questions
  </Button>

  <Button
    variant="outlined"
    onClick={downloadPDF}
  >
    Download PDF
  </Button>
</Box>
</Box>

   {Object.entries(questions).map(([section, list]) => (
  <Accordion
    key={section}
    sx={{
      mb: 2,
      borderRadius: 2,
      "&:before": {
        display: "none",
      },
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography fontWeight={700}>
        {section.toUpperCase()} ({list.length})
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      {list.map((question, index) => (
        <Typography
          key={index}
          sx={{
            mb: 2,
          }}
        >
          {index + 1}. {question}
        </Typography>
      ))}
    </AccordionDetails>
  </Accordion>
))}
  </Paper>
)}

        {screeningError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {screeningError}
          </Alert>
        )}

        {selectedJob && (
          <>
            <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
              {[
                ["Total Candidates", candidates.length, "primary"],
                ["🟢 Shortlist", shortlistCount, "success"],
                ["🟠 Review", reviewCount, "warning"],
                ["🔴 Do Not Shortlist", doNotShortlistCount, "error"],
              ].map(([label, value, color]) => (
                <Grid key={label} item xs={12} md={3}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography color="text.secondary">{label}</Typography>
                      {screeningLoading ? (
                        <Skeleton width={64} height={50} />
                      ) : (
                        <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
                          {value}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
              <TextField
                label="Search Candidate"
                placeholder="Name, email, or skills"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ minWidth: 300 }}
              />

              <FormControl sx={{ minWidth: 180 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Accepted">Accepted</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {screeningLoading ? (
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                {[1, 2, 3].map((row) => (
                  <Skeleton key={row} variant="rounded" height={92} sx={{ mb: 2 }} />
                ))}
              </Paper>
            ) : candidates.length === 0 && !screeningError ? (
              <Paper sx={{ p: 6, borderRadius: 3, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                  No applicants to screen yet
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  Applicants will appear here after they apply for this job.
                </Typography>
              </Paper>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table sx={{ minWidth: 1500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Candidate</b></TableCell>
                      <TableCell><b>AI Match</b></TableCell>
                      <TableCell><b>Recommendation</b></TableCell>
                      <TableCell><b>Candidate Skills</b></TableCell>
                      <TableCell><b>Required Skills</b></TableCell>
                      <TableCell><b>Matched Skills</b></TableCell>
                      <TableCell><b>Missing Skills</b></TableCell>
                      <TableCell><b>Resume</b></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCandidates.map((candidate) => {
                      const recommendation = getRecommendationConfig(
                        candidate.recommendation
                      );

                      return (
                        <TableRow
                          key={candidate._id}
                          hover
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setDrawerOpen(true);
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <Typography fontWeight={700}>{candidate.fullName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <MatchScore percentage={candidate.matchPercentage} />
                          </TableCell>
                          <TableCell sx={{ minWidth: 260 }}>
                            <Chip
                              label={recommendation.label}
                              color={recommendation.color}
                              sx={{ fontWeight: 700 }}
                            />
                            <Card variant="outlined" sx={{ mt: 1, boxShadow: "none" }}>
                              <CardContent sx={{ p: "10px !important" }}>
                                <Typography variant="body2">{candidate.reason}</Typography>
                              </CardContent>
                            </Card>
                          </TableCell>
                          <TableCell><SkillChips skills={candidate.candidateSkills} /></TableCell>
                          <TableCell><SkillChips skills={candidate.requiredSkills} color="primary" /></TableCell>
                          <TableCell><SkillChips skills={candidate.matchedSkills} color="success" /></TableCell>
                          <TableCell><SkillChips skills={candidate.missingSkills} color="error" /></TableCell>
                          <TableCell>
                            {candidate.resume ? (
                              <Stack direction="row" spacing={1}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    window.open(getResumeUrl(candidate.resume), "_blank");
                                  }}
                                >
                                  View
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  component="a"
                                  href={getResumeUrl(candidate.resume)}
                                  download
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  Download
                                </Button>
                              </Stack>
                            ) : (
                              <Typography color="text.secondary">No resume</Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {!screeningLoading && candidates.length > 0 && filteredCandidates.length === 0 && (
              <Paper sx={{ p: 4, mt: 3, borderRadius: 3, textAlign: "center" }}>
                <Typography color="text.secondary">
                  No candidates match your current search or status filter.
                </Typography>
              </Paper>
            )}
          </>
        )}

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          {selectedCandidate && (
            <Box sx={{ width: 460, p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">Candidate Profile</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Stack spacing={2.5}>
                <Box textAlign="center">
                  <Avatar sx={{ width: 80, height: 80, mx: "auto", bgcolor: "primary.main", fontSize: 30 }}>
                    {selectedCandidate.fullName?.[0]}
                  </Avatar>
                  <Typography variant="h6" mt={2}>{selectedCandidate.fullName}</Typography>
                </Box>

                <Divider />

                <Typography><EmailIcon sx={{ mr: 1, verticalAlign: "middle" }} />{selectedCandidate.email}</Typography>
                <Typography><PhoneIcon sx={{ mr: 1, verticalAlign: "middle" }} />{selectedCandidate.phone}</Typography>
                <Typography><WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />{selectedCandidate.portfolio || "No portfolio"}</Typography>

                {selectedCandidate.resumeExtractionError && (
                  <Alert severity="warning">{selectedCandidate.resumeExtractionError}</Alert>
                )}

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">AI Match</Typography>
                    <MatchScore percentage={selectedCandidate.matchPercentage} />
                    <Chip
                      label={getRecommendationConfig(selectedCandidate.recommendation).label}
                      color={getRecommendationConfig(selectedCandidate.recommendation).color}
                      sx={{ mt: 2, fontWeight: 700 }}
                    />
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography fontWeight={700} mb={1}>AI Reason</Typography>
                    <Typography>{selectedCandidate.reason}</Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                   <CardContent>
                     <Typography
                         fontWeight={700}
                         color="primary"
                          mb={1}
                       >
                          AI Summary
                       </Typography>

                      <Typography>
                         {selectedCandidate.aiSummary ||
                          "No AI summary available."}
                        </Typography>
                     </CardContent>
                  
                 </Card>

                 <Card variant="outlined">
  <CardContent>
    <Typography
      fontWeight={700}
      color="success.main"
      mb={1}
    >
      Strengths
    </Typography>

    {selectedCandidate.strengths?.length ? (
      selectedCandidate.strengths.map((item, index) => (
        <Typography key={index}>
          • {item}
        </Typography>
      ))
    ) : (
      <Typography>No strengths available.</Typography>
    )}
  </CardContent>
</Card> 

<Card variant="outlined">
  <CardContent>
    <Typography
      fontWeight={700}
      color="error"
      mb={1}
    >
      Weaknesses
    </Typography>

    {selectedCandidate.weaknesses?.length ? (
      selectedCandidate.weaknesses.map((item, index) => (
        <Typography key={index}>
          • {item}
        </Typography>
      ))
    ) : (
      <Typography>No weaknesses available.</Typography>
    )}
  </CardContent>
</Card>
<Card
  sx={{
    bgcolor: "#F8FAFC",
    border: "1px solid #E2E8F0",
  }}
>
  <CardContent>
    <Typography
      fontWeight={700}
      color="secondary"
      mb={1}
    >
      Gemini Recommendation
    </Typography>

    <Typography>
      {selectedCandidate.aiRecommendation ||
        "No recommendation available."}
    </Typography>
  </CardContent>
</Card>

                <Box>
                  <Typography fontWeight={700} mb={1}>Candidate Skills</Typography>
                  <SkillChips skills={selectedCandidate.candidateSkills} />
                </Box>
                <Box>
                  <Typography fontWeight={700} mb={1}>Required Skills</Typography>
                  <SkillChips skills={selectedCandidate.requiredSkills} color="primary" />
                </Box>
                <Box>
                  <Typography fontWeight={700} mb={1}>Matched Skills</Typography>
                  <SkillChips skills={selectedCandidate.matchedSkills} color="success" />
                </Box>
                <Box>
                  <Typography fontWeight={700} mb={1}>Missing Skills</Typography>
                  <SkillChips skills={selectedCandidate.missingSkills} color="error" />
                </Box>

                <Box display="flex" gap={2}>
                  <Button fullWidth variant="contained" color="success" onClick={() => updateStatus(selectedCandidate._id, "Accepted")}>
                    Accept
                  </Button>
                  <Button fullWidth variant="contained" color="error" onClick={() => updateStatus(selectedCandidate._id, "Rejected")}>
                    Reject
                  </Button>
                </Box>

                {selectedCandidate.resume && (
                  <Button
                    fullWidth
                    startIcon={<DescriptionIcon />}
                    variant="outlined"
                    onClick={() => window.open(getResumeUrl(selectedCandidate.resume), "_blank")}
                  >
                    View Resume
                  </Button>
                )}
              </Stack>
            </Box>
          )}
        </Drawer>
      </Box>
    </>
  );
}
