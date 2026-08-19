import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ProfileCompletionCard({ user }) {
  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Company Name", value: user.companyName },
    { label: "Designation", value: user.designation },
    { label: "Website", value: user.website },
    { label: "Address", value: user.address },
    { label: "Company Description", value: user.description },
  ];

  const completedFields = fields.filter(
    (field) => field.value && field.value.trim() !== ""
  ).length;

  const completion = Math.round(
    (completedFields / fields.length) * 100
  );

  const getColor = () => {
    if (completion >= 80) return "success";
    if (completion >= 50) return "warning";
    return "error";
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          👤 Profile Completion
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          Complete your recruiter profile to build trust with candidates.
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight={600}>
            {completion}% Completed
          </Typography>

          <Typography color="text.secondary">
            {completedFields}/{fields.length} Fields
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={completion}
          color={getColor()}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 3,
          }}
        />

        <Stack spacing={1}>
          {fields.map((field) => (
            <Box
              key={field.label}
              display="flex"
              alignItems="center"
              gap={1}
            >
              {field.value ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <CancelIcon color="error" fontSize="small" />
              )}

              <Typography>{field.label}</Typography>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={3}
        >
          Last Updated:{" "}
          {user.updatedAt
            ? new Date(user.updatedAt).toLocaleDateString()
            : "Today"}
        </Typography>
      </CardContent>
    </Card>
  );
}