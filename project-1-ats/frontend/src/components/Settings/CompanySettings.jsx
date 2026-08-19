import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function CompanySettings({
  user,
  setUser,
  saveSettings,
}) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Company Settings
        </Typography>

        <Grid container spacing={3}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Company Name"
              value={user.companyName}
              onChange={(e) =>
                setUser({
                  ...user,
                  companyName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Company Website"
              value={user.website}
              onChange={(e) =>
                setUser({
                  ...user,
                  website: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Company Address"
              value={user.address}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Company Description"
              value={user.description}
              onChange={(e) =>
                setUser({
                  ...user,
                  description: e.target.value,
                })
              }
            />
          </Grid>

        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
          }}
          onClick={saveSettings}
        >
          Save Company Details
        </Button>

      </CardContent>
    </Card>
  );
}