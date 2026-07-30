import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  const changePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.put("/settings/change-password", form);

      alert(data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Security
        </Typography>

        <Grid container spacing={3}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type={showCurrent ? "text" : "password"}
              label="Current Password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  currentPassword: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrent(!showCurrent)
                      }
                    >
                      {showCurrent ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type={showNew ? "text" : "password"}
              label="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowNew(!showNew)
                      }
                    >
                      {showNew ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type={showConfirm ? "text" : "password"}
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                    >
                      {showConfirm ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: 2,
          }}
          onClick={changePassword}
        >
          Change Password
        </Button>

      </CardContent>
    </Card>
  );
}