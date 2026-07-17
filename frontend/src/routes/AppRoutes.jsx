import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import BrowseJobs from "../pages/Applicant/BrowseJobs";
import JobDetails from "../pages/Applicant/JobDetails";
import ApplyJob from "../pages/Applicant/ApplyJob";
import MyApplications from "../pages/Applicant/MyApplications";
import Applicants from "../pages/Recruiter/Applicants";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Navigate to="/choose-role" replace />} />
        <Route path="/register" element={<Navigate to="/choose-role" replace />} />
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
        <Route element={<ProtectedRoute role="recruiter" />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<Jobs />} />
          <Route path="/recruiter/jobs/create" element={<CreateJob />} />
          <Route path="/recruiter/applicants" element={<Applicants />} />
        </Route>

        <Route element={<ProtectedRoute role="applicant" />}>
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant/jobs" element={<BrowseJobs />} />
          <Route path="/applicant/jobs/:id" element={<JobDetails />} />
          <Route path="/applicant/jobs/:id/apply" element={<ApplyJob />} />
          <Route path="/applicant/my-applications" element={<MyApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;