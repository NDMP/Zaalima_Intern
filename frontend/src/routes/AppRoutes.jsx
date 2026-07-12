import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RecruiterLogin from "../pages/Recruiter/Login";
import RecruiterRegister from "../pages/Recruiter/Register";
import ApplicantLogin from "../pages/Applicant/Login";
import ApplicantRegister from "../pages/Applicant/Register";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import Jobs from "../pages/Recruiter/Jobs";
import CreateJob from "../pages/Recruiter/CreateJob";
import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/recruiter" element={<h1>Recruiter Dashboard</h1>} />
        <Route path="/applicant" element={<h1>Applicant Dashboard</h1>} />
        <Route
  path="/recruiter/login"
  element={<RecruiterLogin />}
/>
<Route
  path="/recruiter/register"
  element={<RecruiterRegister />}
/>
<Route
  path="/applicant/login"
  element={<ApplicantLogin />}
/>

<Route
  path="/applicant/register"
  element={<ApplicantRegister />}
/>
<Route
  path="/choose-role"
  element={<RoleSelection />}
/> 
<Route
  path="/recruiter/dashboard"
  element={<RecruiterDashboard />}
/>  
<Route
  path="/recruiter/jobs"
  element={<Jobs />}
/>
<Route
  path="/recruiter/jobs/create"
  element={<CreateJob />}
/>
<Route
  path="/applicant/dashboard"
  element={<ApplicantDashboard />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;