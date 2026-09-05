import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';

function LoginForm() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth,
  );

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));

    setValidationError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = credentials.email.trim();
    const password = credentials.password;

    if (!email || !password) {
      setValidationError('Email and password are required.');
      return;
    }

    dispatch(
      login({
        email,
        password,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          disabled={loading}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={loading}
        />
      </label>

      {(validationError || error) && (
        <p className="form-error">
          {validationError || error}
        </p>
      )}

      <button
        className="button button-dark full-width"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
        <span>-&gt;</span>
      </button>
    </form>
  );
}

export default LoginForm;