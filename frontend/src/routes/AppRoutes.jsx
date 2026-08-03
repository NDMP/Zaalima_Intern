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
import Analytics from "../pages/Recruiter/Analytics";
import AIScreening from "../pages/Recruiter/AIScreening";
import Settings from "../pages/Recruiter/Settings";
import Interviews from "../pages/Recruiter/Interviews";
import ProtectedRoute from "./ProtectedRoute";
import SavedJobs from "../pages/Applicant/SavedJobs";
import Profile from "../pages/Applicant/Profile";
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
<Route
  path="/recruiter/analytics"
  element={<Analytics />}
/>

<Route
  path="/recruiter/ai-screening"
  element={<AIScreening />}
/>

<Route
  path="/recruiter/interviews"
  element={<Interviews />}
/>

<Route
  path="/recruiter/settings"
  element={<Settings />}
/>
        <Route element={<ProtectedRoute role="applicant" />}>
  <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />

  <Route path="/applicant/jobs" element={<BrowseJobs />} />

  <Route path="/applicant/jobs/:id" element={<JobDetails />} />

  <Route path="/applicant/jobs/:id/apply" element={<ApplyJob />} />

  <Route path="/applicant/my-applications" element={<MyApplications />} />

  <Route path="/applicant/saved-jobs" element={<SavedJobs />} />

  <Route path="/applicant/profile" element={<Profile />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;