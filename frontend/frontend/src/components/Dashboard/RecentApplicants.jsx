import {
  Paper,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

const applicants = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    score: "95%",
    status: "Shortlisted",
  },
  {
    name: "Priya Verma",
    role: "UI/UX Designer",
    score: "92%",
    status: "Interview",
  },
  {
    name: "Aarav Singh",
    role: "Backend Developer",
    score: "88%",
    status: "Review",
  },
];

export default function RecentApplicants({ applicants: recentApplicants = applicants }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Recent Applicants
      </Typography>

      {recentApplicants.map((applicant) => (
        <Box
          key={applicant.name}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            borderBottom: "1px solid #F1F5F9",

            "&:last-child": {
              borderBottom: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: "#2563EB" }}>
              {applicant.name[0]}
            </Avatar>

            <Box>
              <Typography fontWeight={600}>
                {applicant.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {applicant.role}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography fontWeight={700}>
              {applicant.score}
            </Typography>

            <Chip
              label={applicant.status}
              color="primary"
              size="small"
            />
          </Box>
        </Box>
      ))}
    </Paper>
  );
}