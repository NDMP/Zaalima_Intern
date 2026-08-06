import { Grid, Paper, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Browse Jobs",
    icon: <WorkIcon />,
    path: "/applicant/jobs",
  },
  {
    title: "My Applications",
    icon: <AssignmentIcon />,
    path: "/applicant/my-applications",
  },
  {
    title: "Saved Jobs",
    path: "",
    icon: <FavoriteIcon />,
    path: "/applicant/saved-jobs"
  },
  {
    title: "Profile",
    path: "/applicant/profile",
    icon: <PersonIcon />,
  },
];

export default function QuickActions() {
  return (
    <Grid container spacing={3} sx={{ mt: 2, mb: 5 }}>
      {actions.map((action) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={action.title}
        >
          {action.path ? (
            <Link
              to={action.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: ".3s",
                  border: "1px solid #E2E8F0",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.04)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 18px 40px rgba(37, 99, 235, 0.12)",
                    borderColor: "#93C5FD",
                  },
                }}
              >
                {action.icon}

                <Typography mt={2} fontWeight={600}>
                  {action.title}
                </Typography>
              </Paper>
            </Link>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                border: "1px solid #E5E7EB",
                opacity: 0.6,
                cursor: "not-allowed",
              }}
            >
              {action.icon}

              <Typography mt={2} fontWeight={600}>
                {action.title}
              </Typography>
            </Paper>
          )}
        </Grid>
      ))}
    </Grid>
  );
}