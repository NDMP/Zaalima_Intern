import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/recruiter" element={<h1>Recruiter Dashboard</h1>} />
        <Route path="/applicant" element={<h1>Applicant Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;