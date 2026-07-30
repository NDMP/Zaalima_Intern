import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function ProfileSettings({
  user,
  setUser,
  saveSettings,
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Profile Settings
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          mb={4}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 36,
            }}
          >
            {user.name?.[0]}
          </Avatar>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={user.name}
              onChange={(e)=>
                setUser({
                  ...user,
                  name:e.target.value
                })
              }
            />
          </Grid>

          <Grid size={{ xs:12, md:6 }}>
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              onChange={(e)=>
                setUser({
                  ...user,
                  email:e.target.value
                })
              }
            />
          </Grid>

          <Grid size={{ xs:12, md:6 }}>
            <TextField
              fullWidth
              label="Company Name"
              value={user.companyName}
              onChange={(e)=>
                setUser({
                  ...user,
                  companyName:e.target.value
                })
              }
            />
          </Grid>

          <Grid size={{ xs:12, md:6 }}>
            <TextField
              fullWidth
              label="Designation"
              value={user.designation}
              onChange={(e)=>
                setUser({
                  ...user,
                  designation:e.target.value
                })
              }
            />
          </Grid>

        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt:4,
            py:1.5,
            borderRadius:2,
          }}
          onClick={saveSettings}
        >
          Save Changes
        </Button>

      </CardContent>
    </Card>
  );
}