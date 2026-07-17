import { Navigate, Outlet } from "react-router-dom";
import { getUser, isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ role }) {
  if (!isAuthenticated()) {
    return <Navigate to="/choose-role" replace />;
  }

  const user = getUser();

  if (role && user?.role !== role) {
    return <Navigate to="/choose-role" replace />;
  }

  return <Outlet />;
}
