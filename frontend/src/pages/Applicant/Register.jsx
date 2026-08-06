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

      saveAuthSession({ token: data.token, user: data.user });
      toast.success("Registration successful!");
      navigate("/applicant/dashboard", { replace: true });
    } catch (apiError) {
      const message = apiError?.response?.data?.message || "Registration failed";
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

          <Typography variant="h4" fontWeight={800} align="center" mb={0.75}>Create account</Typography>
          <Typography align="center" color="text.secondary" fontWeight={500}>Applicant registration</Typography>

          {error ? <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert> : null}

          <TextField fullWidth label="Full Name" margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mt: 3 }} />
          <TextField fullWidth label="Phone Number" margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField fullWidth label="Current Location" margin="normal" value={location} onChange={(e) => setLocation(e.target.value)} />
          <TextField fullWidth label="Work Email" placeholder="Enter your email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="primary" /></InputAdornment> }} />
          <TextField fullWidth label="Password" placeholder="Enter your password" margin="dense" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="primary" /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={{ mt: 2 }} />
          <TextField fullWidth label="Confirm Password" type={showPassword ? "text" : "password"} margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="primary" /></InputAdornment> }} />

          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>Password must be at least 6 characters.</Typography>

          <FormControlLabel control={<Checkbox />} label={<Typography fontSize={14}>I agree to the <Link href="#" underline="hover">Terms & Conditions</Link> and <Link href="#" underline="hover">Privacy Policy</Link></Typography>} />
          <Button fullWidth variant="contained" size="large" onClick={handleRegister} disabled={loading} sx={{ mt: 2, py: 1.4, borderRadius: 2, fontWeight: 700, textTransform: "none" }}>
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <Divider sx={{ my: 3, color: "#94A3B8", fontWeight: 600 }}>Already have an account?</Divider>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Typography color="text.secondary">Welcome back?</Typography>
            <RouterLink to="/applicant/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign in</RouterLink>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}