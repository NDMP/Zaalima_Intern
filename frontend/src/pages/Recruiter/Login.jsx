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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { saveAuthSession } from "../../utils/auth";

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const { data } = await api.post("/auth/login", { email, password });

      if (data?.user?.role !== "recruiter") {
        setError("Only recruiter accounts can login here.");
        return;
      }

      saveAuthSession({ token: data.token, user: data.user });
      toast.success("Login successful!");
      navigate("/recruiter/dashboard", { replace: true });
    } catch (apiError) {
      const message = apiError?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", display: "flex", alignItems: "center", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #E2E8F0", boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", bgcolor: "rgba(37, 99, 235, 0.12)" }}>
              <SmartToyIcon color="primary" sx={{ fontSize: 26 }} />
            </Box>
            <Typography variant="h5" fontWeight={800}>TalentFlow</Typography>
          </Box>

          <Typography variant="h4" fontWeight={800} align="center" mb={0.75}>Welcome back</Typography>
          <Typography align="center" color="text.secondary" fontWeight={500}>Recruiter login</Typography>

          {error ? <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert> : null}

          <TextField fullWidth label="Email" placeholder="Enter your email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="primary" /></InputAdornment> }} sx={{ mt: 3 }} />
          <TextField fullWidth label="Password" placeholder="Enter your password" margin="dense" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="primary" /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={{ mt: 2, mb: 1.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
            <FormControlLabel control={<Checkbox />} label={<Typography sx={{ whiteSpace: "nowrap", fontSize: "0.95rem" }}>Remember me</Typography>} />
            <Link href="#" underline="hover" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Forgot password?</Link>
          </Box>

          <Button fullWidth variant="contained" size="large" onClick={handleLogin} disabled={loading} sx={{ mt: 3, py: 1.4, borderRadius: 2, fontWeight: 700, textTransform: "none" }}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Divider sx={{ my: 3, color: "#94A3B8", fontWeight: 600 }}>New here?</Divider>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Typography color="text.secondary">Need an account?</Typography>
            <RouterLink to="/recruiter/register" style={{ color: "#2563EB", fontWeight: 700 }}>Create account</RouterLink>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}