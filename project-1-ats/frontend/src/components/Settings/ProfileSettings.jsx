import {
  Avatar,
  Box,
  Button,
  Paper,
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
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Header with Avatar */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          textAlign: "center",
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          mb={2}
          sx={{ color: "#0F172A" }}
        >
          Profile Settings
        </Typography>

        <Avatar
          sx={{
            width: 90,
            height: 90,
            fontSize: 36,
            bgcolor: "#2563EB",
            color: "#fff",
            fontWeight: 800,
            mx: "auto",
          }}
        >
          {user.name?.[0]?.toUpperCase()}
        </Avatar>

        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            color: "#64748B",
            fontSize: "0.85rem",
          }}
        >
          {user.email}
        </Typography>
      </Box>

      {/* Form Content */}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#0F172A",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1,
              }}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              placeholder="Your full name"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#0F172A",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="your@email.com"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#0F172A",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1,
              }}
            >
              Company Name
            </Typography>
            <TextField
              fullWidth
              value={user.companyName}
              onChange={(e) =>
                setUser({
                  ...user,
                  companyName: e.target.value,
                })
              }
              placeholder="Your company name"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#0F172A",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 1,
              }}
            >
              Designation
            </Typography>
            <TextField
              fullWidth
              value={user.designation}
              onChange={(e) =>
                setUser({
                  ...user,
                  designation: e.target.value,
                })
              }
              placeholder="Your designation"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={saveSettings}
          sx={{
            mt: 3,
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            backgroundColor: "#2563EB",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(23, 59, 120, 0.15)",
            transition: "all 160ms ease",
            "&:hover": {
              backgroundColor: "#1D4ED8",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(23, 59, 120, 0.25)",
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}