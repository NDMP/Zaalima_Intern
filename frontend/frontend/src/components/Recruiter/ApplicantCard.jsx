import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Stack,
} from "@mui/material";

export default function ApplicantCard({
  application,
  onShortlist,
  onReject,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        transition: ".3s",
        "&:hover": {
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex" gap={2}>
          <Avatar sx={{ bgcolor: "#2563EB" }}>
            {application.fullName?.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {application.fullName}
            </Typography>

            <Typography color="text.secondary">
              {application.email}
            </Typography>
          </Box>
        </Box>

        <Chip
          label={application.status}
          color={
  application.status === "Accepted"
    ? "success"
    : application.status === "Rejected"
    ? "error"
    : "warning"
}
        />
      </Box>

      <Box mt={3}>
        <Typography fontWeight={600}>
          Applied For
        </Typography>

        <Typography color="text.secondary">
          {application.job?.title}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography fontWeight={600}>
          Resume
        </Typography>

        <Typography color="text.secondary">
          {application.resume}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography fontWeight={600}>
          Applied On
        </Typography>

        <Typography color="text.secondary">
          {new Date(application.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        mt={3}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => onShortlist(application._id)}
        >
          Accept
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => onReject(application._id)}
        >
          Reject
        </Button>
      </Stack>
    </Paper>
  );
}