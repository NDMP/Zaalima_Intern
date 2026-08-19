import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Alert,
} from "@mui/material";


import EmailIcon from "@mui/icons-material/Email";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { toast } from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { saveAuthSession } from "../../utils/auth";

export default function ApplicantRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !phone || !location || !email || !password || !confirmPassword) {
      const message = "Please fill all fields";
setError(message);
toast.error(message);
      return;
    }

    if (password !== confirmPassword) {
  const message = "Password and confirm password must match";
  setError(message);
  toast.error(message);
  return;
}

    if (password.length < 6) {
  const message = "Password must be at least 6 characters";
  setError(message);
  toast.error(message);
  return;
}

    try {
      setError("");
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name: fullName,
        email,
        password,
        role: "applicant",
        phone,
        location,
      });

      saveAuthSession({
        token: data.token,
        user: data.user,
      });
toast.success("Registration successful!");
      navigate("/applicant/dashboard", { replace: true });
    } catch (apiError) {
      const message =
  apiError?.response?.data?.message || "Registration failed";

setError(message);
toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
  elevation={0}
  sx={{
    p: 5,
    borderRadius: "24px",
    boxShadow: "0 25px 60px rgba(37,99,235,.15)",
border: "1px solid #E2E8F0",
  }}
>   <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    mb: 3,
  }}
>
  <SmartToyIcon
    color="primary"
    sx={{
      fontSize: 44,
    }}
  />

  <Typography
    variant="h5"
    fontWeight={700}
  >
    TalentFlow
  </Typography>
</Box>
          <Typography
            variant="h4"
            fontWeight={800}
            align="center"
            mb={1}
          >
            Create Account
          </Typography>

          <Typography
color="text.secondary"
fontWeight={500}
>
Applicant Registration
</Typography>

          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}

<TextField
  fullWidth
  label="Full Name"
  margin="normal"
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
    },
  }}
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>

<TextField
  fullWidth
  label="Phone Number"
  margin="normal"
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
    },
  }}
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
<TextField
  fullWidth
  label="Current Location"
  margin="normal"
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
    },
  }}
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

         <TextField
  fullWidth
  label="Work Email"
  placeholder="Enter your email"
  margin="normal"
  sx={{
    mt: 2,

    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",

      "&:hover fieldset": {
        borderColor: "#2563EB",
      },

      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#2563EB",
      },
    },
  }}
  InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <EmailIcon color="primary" />
    </InputAdornment>
  ),
}}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <TextField
  fullWidth
  label="Password"
  placeholder="Enter your password"
  margin="dense"
  type={showPassword ? "text" : "password"}
  sx={{
    mt: 3,
    mb: 2,

    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",

      "&:hover fieldset": {
        borderColor: "#2563EB",
      },

      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#2563EB",
      },
    },
  }}
  InputProps={{
    startAdornment: (
  <InputAdornment position="start">
    <LockIcon color="primary" />
  </InputAdornment>
),

    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/> 

<TextField
  fullWidth
  label="Confirm Password"
  type={showPassword ? "text" : "password"}
  margin="normal"
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LockIcon color="primary" />
      </InputAdornment>
    ),
  }}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
<Typography
  variant="caption"
  color="text.secondary"
  sx={{ ml: 1 }}
>
Password must be at least 6 characters.
</Typography>
      
<FormControlLabel
  control={<Checkbox />}
  label={
    <Typography fontSize={14}>
      I agree to the{" "}
      <Link href="#" underline="hover">
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link href="#" underline="hover">
        Privacy Policy
      </Link>
    </Typography>
  }
/>
          <Button
  fullWidth
  variant="contained"
  size="large"
          onClick={handleRegister}
          disabled={loading}
  sx={{
  mt: 3,
  py: 1.7,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "none",

  boxShadow: "0 10px 30px rgba(37,99,235,.35)",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 18px 35px rgba(37,99,235,.45)",
  },
}}
>
  {loading ? "Creating account..." : "Create Account"}
</Button>

<Divider
  sx={{
    my: 3,
    color: "#94A3B8",
    fontWeight: 600,
  }}
>
  OR
</Divider>

<Typography align="center">
  Already have an account?
{" "}
  <Link
    component={RouterLink}
    to="/applicant/login"
    underline="hover"
    fontWeight={700}
  >
    Login
  </Link>
</Typography>

<Typography
  align="center"
  color="text.secondary"
  mt={4}
  fontSize={12}
color="text.secondary"
>
  © 2026 TalentFlow
</Typography>

          

        </Paper>
      </Container>
    </Box>
  );
}