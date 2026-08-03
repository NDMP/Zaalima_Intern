import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

export default function UpcomingInterviewCard({ interview }) {
  if (!interview) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>

        <Typography variant="h5" fontWeight={700} mb={2}>
          📅 Upcoming Interview
        </Typography>

        <Stack spacing={1}>

          <Typography>
            <strong>Job:</strong> {interview.job?.title}
          </Typography>

          <Typography>
            <strong>Date:</strong>{" "}
            {new Date(interview.interview.date).toLocaleDateString()}
          </Typography>

          <Typography>
            <strong>Time:</strong>{" "}
            {interview.interview.time}
          </Typography>

          <Typography>
            <strong>Mode:</strong>{" "}
            {interview.interview.mode}
          </Typography>

          <Chip
            label={interview.interview.status}
            color="primary"
            sx={{ width: "fit-content" }}
          />

          {interview.interview.mode === "Online" &&
            interview.interview.meetLink && (
              <Button
                variant="contained"
                href={interview.interview.meetLink}
                target="_blank"
              >
                Join Meeting
              </Button>
          )}

          {interview.interview.mode === "Offline" &&
            interview.interview.location && (
              <Typography>
                📍 {interview.interview.location}
              </Typography>
          )}

        </Stack>

      </CardContent>
    </Card>
  );
}