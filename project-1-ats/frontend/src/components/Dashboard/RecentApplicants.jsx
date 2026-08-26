import {
  Paper,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

const applicants = [
  {
    name: "Ankur Ojha",
    role: "Frontend Developer",
    status: "Accepted",
    time: "2h ago",
    avatar: "A",
  },
  {
    name: "Kamal Raj A P",
    role: "DevOps Engineer",
    status: "Accepted",
    time: "5h ago",
    avatar: "K",
  },
  {
    name: "Sneha Verma",
    role: "UI/UX Designer",
    status: "Under Review",
    time: "1d ago",
    avatar: "S",
  },
  {
    name: "Rohit Sharma",
    role: "Backend Developer",
    status: "Shortlisted",
    time: "2d ago",
    avatar: "R",
  },
  {
    name: "Priya Mehta",
    role: "QA Engineer",
    status: "Rejected",
    time: "3d ago",
    avatar: "P",
  },
];

const statusColors = {
  Accepted: { bgcolor: "#DCFCE7", color: "#15803D" },
  "Under Review": { bgcolor: "#E0F2FE", color: "#0369A1" },
  Shortlisted: { bgcolor: "#FFEDD5", color: "#C2410C" },
  Rejected: { bgcolor: "#FEE2E2", color: "#B91C1C" },
};

export default function RecentApplicants({ applicants: recentApplicants = applicants }) {
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={800} sx={{ color: "#0F172A", fontSize: "1.1rem" }}>
          Recent Applicants
        </Typography>
        <Typography sx={{ color: "#2563EB", fontWeight: 700, fontSize: "0.85rem" }}>
          View all
        </Typography>
      </Box>

      {recentApplicants && recentApplicants.length > 0 ? (
        recentApplicants.map((applicant, index) => {
          const statusStyle = statusColors[applicant.status] || { bgcolor: "#F3F4F6", color: "#6B7280" };
          return (
            <Box
              key={`${applicant.name}-${index}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                px: 0.5,
                borderBottom: index !== recentApplicants.length - 1 ? "1px solid #F1F5F9" : "none",
                transition: "all 160ms ease",
                borderRadius: 1.5,
                "&:hover": {
                  bgcolor: "#F8FAFC",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flex: 1, minWidth: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "#E5E7EB",
                    color: "#0F172A",
                    fontWeight: 800,
                    width: 30,
                    height: 30,
                    fontSize: "0.8rem",
                  }}
                >
                  {applicant.avatar}
                </Avatar>

                <Box minWidth={0}>
                  <Typography fontWeight={700} sx={{ fontSize: "0.92rem", color: "#0F172A" }} noWrap>
                    {applicant.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ color: "#64748B", display: "block", mt: 0.2 }} noWrap>
                    {applicant.role}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1, flexShrink: 0 }}>
                <Chip
                  label={applicant.status}
                  size="small"
                  sx={{
                    bgcolor: statusStyle.bgcolor,
                    color: statusStyle.color,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: 1,
                    border: "none",
                    py: 0.2,
                  }}
                />
                <Typography sx={{ fontSize: "0.72rem", color: "#64748B", whiteSpace: "nowrap" }}>{applicant.time}</Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
          No recent applicants
        </Typography>
      )}
    </Paper>
  );
}