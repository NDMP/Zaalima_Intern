import { Paper, Typography, Button, Stack } from "@mui/material";

export default function QuickActions() {
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
        Quick Actions
      </Typography>

      <Stack
  direction="row"
  spacing={2}
  sx={{ flexWrap: "wrap" }}
>
        <Button
          variant="contained"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          + Post Job
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          View Applicants
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          AI Resume Screening
        </Button>
      </Stack>
    </Paper>
  );
}