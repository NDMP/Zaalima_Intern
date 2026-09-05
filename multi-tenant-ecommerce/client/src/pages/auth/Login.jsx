import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm';

function Login() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  if (isAuthenticated && user) {
    if (user.role === 'SUPER_ADMIN') {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === 'VENDOR') {
      return <Navigate to="/vendor" replace />;
    }
  }

  return (
    <main className="login-page">
      <div className="login-aside">
        <Link className="brand" to="/">
          market<span>place</span>
        </Link>

        <div className="login-quote">
          <p className="eyebrow">Marketplace access</p>

          <h1>
            Build something <em>worth selling.</em>
          </h1>

          <p>
            Sign in to manage your marketplace workspace.
          </p>
        </div>

        <span className="aside-index">
          MP / AUTH / 01
        </span>
      </div>

      <section className="login-panel">
        <p className="eyebrow">Secure access</p>

        <h2>Welcome back.</h2>

        <p className="muted">
          Sign in to continue to your workspace.
        </p>

        <LoginForm />

        <p className="login-footer">
          Private workspace
          <span>*</span>
          Secure access
        </p>
      </section>
    </main>
  );
}

export default Login;