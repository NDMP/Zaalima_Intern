import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";

export default function AIScreening() {
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
        <Typography variant="h4" fontWeight={700}>
          AI Screening
        </Typography>
      </Box>
    </>
  );
}