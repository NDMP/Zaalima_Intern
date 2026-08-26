import {
  Button,
  Paper,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import BuildingIcon from "@mui/icons-material/Business";

export default function CompanySettings({
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
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "#DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1D4ED8",
          }}
        >
          <BuildingIcon />
        </Box>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: "#0F172A" }}
        >
          Company Settings
        </Typography>
      </Box>

      {/* Form Content */}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
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
              Company Website
            </Typography>
            <TextField
              fullWidth
              placeholder="https://yourcompany.com"
              value={user.website}
              onChange={(e) =>
                setUser({
                  ...user,
                  website: e.target.value,
                })
              }
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

          <Grid item xs={12}>
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
              Company Address
            </Typography>
            <TextField
              fullWidth
              placeholder="Street address, city, country"
              value={user.address}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
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

          <Grid item xs={12}>
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
              Company Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about your company..."
              value={user.description}
              onChange={(e) =>
                setUser({
                  ...user,
                  description: e.target.value,
                })
              }
              variant="outlined"
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
          Save Company Details
        </Button>
      </Box>
    </Paper>
  );
}