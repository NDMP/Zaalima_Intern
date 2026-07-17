import { Navigate, Outlet } from "react-router-dom";
import { clearAuthSession, getUser, isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ role }) {
  if (!isAuthenticated()) {
    return <Navigate to="/choose-role" replace />;
  }

  const user = getUser();

  if (!user) {
    clearAuthSession();
    return <Navigate to="/choose-role" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/choose-role" replace />;
  }

  return <Outlet />;
}
