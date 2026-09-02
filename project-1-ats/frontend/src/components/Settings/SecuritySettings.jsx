import { useState } from "react";
import {
  Button,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

import api from "../../utils/api";

export default function SecuritySettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const changePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });
      return;
    }

    try {
      const { data } = await api.put("/settings/change-password", form);

      setSnackbar({
        open: true,
        message: data.message || "Password changed successfully!",
        severity: "success",
      });

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to change password",
        severity: "error",
      });
    }
  };

  return (
    <>
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
              bgcolor: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#DC2626",
            }}
          >
            <LockIcon />
          </Box>
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ color: "#0F172A" }}
          >
            Security & Password
          </Typography>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ mb: 2.5 }}>
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
              Current Password
            </Typography>
            <TextField
              fullWidth
              type={showCurrent ? "text" : "password"}
              value={form.currentPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Enter your current password"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrent(!showCurrent)
                      }
                      edge="end"
                      size="small"
                    >
                      {showCurrent ? (
                        <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                      ) : (
                        <Visibility sx={{ fontSize: "1.2rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
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
              New Password
            </Typography>
            <TextField
              fullWidth
              type={showNew ? "text" : "password"}
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              placeholder="Enter your new password"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowNew(!showNew)
                      }
                      edge="end"
                      size="small"
                    >
                      {showNew ? (
                        <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                      ) : (
                        <Visibility sx={{ fontSize: "1.2rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 0.75,
                display: "block",
                color: "#64748B",
                fontSize: "0.8rem",
              }}
            >
              Use at least 8 characters with a mix of letters, numbers, and symbols.
            </Typography>
          </Box>

          <Box sx={{ mb: 2.5 }}>
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
              Confirm New Password
            </Typography>
            <TextField
              fullWidth
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm your new password"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                      edge="end"
                      size="small"
                    >
                      {showConfirm ? (
                        <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                      ) : (
                        <Visibility sx={{ fontSize: "1.2rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.9rem",
                },
              }}
            />
          </Box>

          {/* Update Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={changePassword}
            sx={{
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
            Update Password
          </Button>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}