import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from "@mui/material";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import api from "../../utils/api";

export default function Interviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await api.get("/applications/interviews/all");
      setInterviews(res.data.interviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <Box
        sx={{
          ml: "260px",
          mt: "72px",
          p: 4,
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
          Interview Schedule
        </Typography>

        <Grid container spacing={3}>

          {interviews.map((item) => (

            <Grid xs={12} md={6} lg={4} key={item._id}>

              <Typography
   variant="body1"
  color="text.secondary"
  sx={{ mb: 3 }}
>
  Total Scheduled Interviews: <strong>{interviews.length}</strong>
</Typography>

              <Card>

                <CardContent>

                  <Typography variant="h6">
                    {item.fullName}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.job?.title}
                  </Typography>

                  <Typography mt={2}>
                    📅 {new Date(item.interview.date).toLocaleDateString()}
                  </Typography>

                  <Typography>
                    🕒 {item.interview.time}
                  </Typography>

                  <Typography>
                    🌐 {item.interview.mode}
                  </Typography>

                  <Chip
                    sx={{ mt: 2 }}
                    color="primary"
                    label={item.interview.status}
                  />

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </>
  );
}