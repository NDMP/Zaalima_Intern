import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from '../pages/auth/Login';
import Unauthorized from '../pages/auth/Unauthorized';
import Home from '../pages/customer/Home';
import AdminDashboard from '../pages/admin/AdminDashboard';
import VendorDashboard from '../pages/vendor/VendorDashboard';

import ProtectedRoute from './ProtectedRoute';
import { logout } from '../features/auth/authSlice';

function NotFound() {
  return (
    <main className="center-page">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="button button-dark" to="/">
        Back home
      </Link>
    </main>
  );
}

function AuthRedirect() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'SUPER_ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === 'VENDOR') {
    return <Navigate to="/vendor" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}

function AdminPage() {
  const dispatch = useDispatch();

  return (
    <div>
      <AdminDashboard />

      <button
        type="button"
        onClick={() => dispatch(logout())}
      >
        Sign out
      </button>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={<AuthRedirect />}
      />

      <Route
        element={
          <ProtectedRoute allowedRoles={['SUPER_ADMIN']} />
        }
      >
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={['VENDOR']} />
        }
      >
        <Route
          path="/vendor"
          element={<VendorDashboard />}
        />
      </Route>

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;