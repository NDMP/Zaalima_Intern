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
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { saveAuthSession } from "../../utils/auth";

export default function ApplicantLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      if (data?.user?.role !== "applicant") {
        setError("Only applicant accounts can login here.");
        return;
      }

      saveAuthSession({
        token: data.token,
        user: data.user,
      });

      navigate("/applicant/dashboard", { replace: true });
    } catch (apiError) {
      setError(apiError?.response?.data?.message || "Login failed");
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
            Welcome Back
          </Typography>

          <Typography
color="text.secondary"
fontWeight={500}
>
Applicant Login
</Typography>

          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}

         <TextField
  fullWidth
  label="Email"
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <FormControlLabel
  control={<Checkbox />}
  label={
    <Typography
      sx={{
        whiteSpace: "nowrap",
        fontSize: "15px",
      }}
    >
      Remember me
    </Typography>
  }
/>

           <Link
  href="#"
  underline="hover"
  sx={{
    fontWeight: 600,
    fontSize: "15px",
  }}
>
  Forgot Password?
</Link>
          </Box>

          <Button
  fullWidth
  variant="contained"
  size="large"
            onClick={handleLogin}
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
  {loading ? "Logging in..." : "Login"}
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
  New to TalentFlow?
Create Recruiter Account{" "}
  <Link
    href="/applicant/register"
    underline="hover"
    fontWeight={700}
  >
    Register
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