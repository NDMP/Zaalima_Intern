import { useState } from "react";
import { Alert, Box, Button, Checkbox, Container, Divider, FormControlLabel, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { saveAuthSession } from "../../utils/auth";

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2.5, "&:hover fieldset": { borderColor: "#93C5FD" }, "&.Mui-focused fieldset": { borderColor: "#2563EB", borderWidth: 2 } } };
export default function RecruiterRegister() {
  const navigate = useNavigate(); const [showPassword, setShowPassword] = useState(false); const [fullName, setFullName] = useState(""); const [companyName, setCompanyName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const handleRegister = async () => { if (!fullName || !companyName || !email || !password || !confirmPassword) { const message = "Please fill all fields"; setError(message); toast.error(message); return; } if (password !== confirmPassword) { const message = "Password and confirm password must match"; setError(message); toast.error(message); return; } if (password.length < 6) { const message = "Password must be at least 6 characters"; setError(message); toast.error(message); return; } try { setError(""); setLoading(true); const { data } = await api.post("/auth/register", { name: fullName, email, password, role: "recruiter", companyName }); saveAuthSession({ token: data.token, user: data.user }); toast.success("Registration successful!"); navigate("/recruiter/dashboard", { replace: true }); } catch (apiError) { const message = apiError?.response?.data?.message || "Registration failed"; setError(message); toast.error(message); } finally { setLoading(false); } };
  return <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", display: "grid", placeItems: "center", px: 2, py: 4 }}><Container maxWidth="xs" sx={{ p: 0 }}><Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 20px 55px rgba(15,23,42,.10)" }}>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 2.5 }}><SmartToyIcon sx={{ color: "#2563EB", fontSize: 34 }} /><Typography sx={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 800 }}>TalentFlow</Typography></Box><Typography sx={{ color: "#0F172A", fontSize: "1.65rem", fontWeight: 800, textAlign: "center" }}>Create recruiter account</Typography><Typography color="text.secondary" sx={{ textAlign: "center", mt: .75, mb: 2.5, fontSize: ".9rem" }}>Build and manage your hiring pipeline</Typography>
    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    <StackField label="Full name" value={fullName} onChange={setFullName} />
    <TextField fullWidth label="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon sx={{ color: "#2563EB" }} /></InputAdornment> }} sx={{ ...fieldSx, mt: 2 }} />
    <TextField fullWidth label="Work email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#2563EB" }} /></InputAdornment> }} sx={{ ...fieldSx, mt: 2 }} />
    <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#2563EB" }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={{ ...fieldSx, mt: 2 }} /><TextField fullWidth label="Confirm password" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#2563EB" }} /></InputAdornment> }} sx={{ ...fieldSx, mt: 2 }} />
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, ml: .5 }}>Password must be at least 6 characters.</Typography><FormControlLabel sx={{ mt: 1 }} control={<Checkbox size="small" />} label={<Typography fontSize={13}>I agree to the <Link href="#" underline="hover">Terms & Conditions</Link></Typography>} /><Button fullWidth variant="contained" onClick={handleRegister} disabled={loading} sx={{ mt: 2, minHeight: 48, borderRadius: 2.5, bgcolor: "#2563EB", fontWeight: 700, "&:hover": { bgcolor: "#1D4ED8" } }}>{loading ? "Creating account..." : "Create account"}</Button>
    <Divider sx={{ my: 3 }}>OR</Divider><Typography sx={{ textAlign: "center", fontSize: ".88rem" }}>Already have an account? <Link component={RouterLink} to="/recruiter/login" underline="hover" sx={{ color: "#2563EB", fontWeight: 700 }}>Login</Link></Typography><Typography align="center" color="text.secondary" mt={3} fontSize={12}>(c) 2026 TalentFlow</Typography>
  </Paper></Container></Box>;
}

function StackField({ label, value, onChange }) { return <TextField fullWidth label={label} value={value} onChange={(e) => onChange(e.target.value)} sx={fieldSx} />; }
