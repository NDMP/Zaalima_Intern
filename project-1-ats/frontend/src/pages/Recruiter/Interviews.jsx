import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import api from "../../utils/api";

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  useEffect(() => { api.get("/applications/interviews/all").then((res) => setInterviews(res.data.interviews || [])).catch(() => setInterviews([])); }, []);
  return <Box sx={{ width: "100%" }}>
    <Typography variant="h4" fontWeight={800} mb={1}>Interview Schedule</Typography>
    <Typography color="text.secondary" mb={3}>Keep upcoming conversations organized and easy to follow.</Typography>
    <Card sx={{ mb: 3, p: 2.5, borderRadius: 3, bgcolor: "#EFF6FF", border: "1px solid #BFDBFE", boxShadow: "none" }}><Typography color="text.secondary">Total scheduled interviews</Typography><Typography variant="h4" fontWeight={800} color="#1D4ED8">{interviews.length}</Typography></Card>
    {interviews.length === 0 ? <Card sx={{ p: 5, borderRadius: 3, textAlign: "center", border: "1px solid #E2E8F0" }}><Typography variant="h6" fontWeight={700}>No interviews scheduled</Typography><Typography color="text.secondary" mt={1}>Scheduled interviews will appear here.</Typography></Card> : <Grid container spacing={3}>{interviews.map((item) => <Grid item xs={12} sm={6} lg={4} key={item._id}><Card sx={{ height: "100%", borderRadius: 3, border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(15,23,42,.05)" }}><CardContent sx={{ p: { xs: 2, sm: 3 } }}><Stack direction="row" spacing={1.5} alignItems="center" mb={2}><Avatar sx={{ bgcolor: "#DBEAFE", color: "#1D4ED8" }}>{item.fullName?.[0] || "A"}</Avatar><Box><Typography variant="h6" fontWeight={800}>{item.fullName}</Typography><Typography color="text.secondary">{item.job?.title || "Role not specified"}</Typography></Box></Stack><Stack spacing={1}><Typography>Date: {item.interview?.date ? new Date(item.interview.date).toLocaleDateString() : "Not set"}</Typography><Typography>Time: {item.interview?.time || "Not set"}</Typography><Typography>Mode: {item.interview?.mode || "Not set"}</Typography></Stack><Chip sx={{ mt: 2 }} color="primary" label={item.interview?.status || "Scheduled"} /></CardContent></Card></Grid>)}</Grid>}
  </Box>;
}
