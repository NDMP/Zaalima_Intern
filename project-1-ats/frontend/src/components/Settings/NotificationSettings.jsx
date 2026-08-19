import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
  Stack,
} from "@mui/material";

export default function NotificationSettings({
  user,
  setUser,
  saveSettings,
}) {
  const handleToggle = (key) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: !user.notifications[key],
      },
    });
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Notification Settings
        </Typography>

        <Stack spacing={2}>

          <FormControlLabel
            control={
              <Switch
                checked={user.notifications.emailOnApplication}
                onChange={() =>
                  handleToggle("emailOnApplication")
                }
              />
            }
            label="Email on New Application"
          />

          <FormControlLabel
            control={
              <Switch
                checked={user.notifications.aiScreeningComplete}
                onChange={() =>
                  handleToggle("aiScreeningComplete")
                }
              />
            }
            label="AI Screening Complete"
          />

          <FormControlLabel
            control={
              <Switch
                checked={user.notifications.interviewReminder}
                onChange={() =>
                  handleToggle("interviewReminder")
                }
              />
            }
            label="Interview Reminder"
          />

          <FormControlLabel
            control={
              <Switch
                checked={user.notifications.weeklySummary}
                onChange={() =>
                  handleToggle("weeklySummary")
                }
              />
            }
            label="Weekly Summary"
          />

        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={saveSettings}
        >
          Save Preferences
        </Button>

      </CardContent>
    </Card>
  );
}