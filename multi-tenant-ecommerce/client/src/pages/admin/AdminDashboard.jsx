import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function AdminDashboard() {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [user, setUser] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const login = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || 'Unable to sign in');
			setUser(data.user);
			sessionStorage.setItem('adminToken', data.token);
		} catch (loginError) {
			setError(loginError.message);
		} finally {
			setLoading(false);
		}
	};

	if (user) {
		return (
			<main className="admin-page">
				<header className="admin-header"><Link className="brand" to="/">market<span>place</span></Link><button className="text-button" type="button" onClick={() => { setUser(null); sessionStorage.removeItem('adminToken'); }}>Sign out</button></header>
				<section className="admin-content">
					<p className="eyebrow">Control room</p>
					<h1>Good morning, {user.name.split(' ')[0]}.</h1>
					<p className="muted">Here is the shape of your marketplace today.</p>
					<div className="stat-grid"><div><span>Stores</span><strong>0</strong></div><div><span>Orders today</span><strong>0</strong></div><div><span>Customers</span><strong>0</strong></div></div>
					<div className="empty-state"><span>✦</span><strong>Your dashboard is ready.</strong><p>Connect your stores and products to see activity here.</p></div>
				</section>
			</main>
		);
	}

	return (
		<main className="login-page">
			<Link className="brand" to="/">market<span>place</span></Link>
			<section className="login-panel">
				<p className="eyebrow">Admin access</p>
				<h1>Welcome back.</h1>
				<p className="muted">Sign in to manage your marketplace.</p>
				<form onSubmit={login}>
					<label>Email<input type="email" value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} required /></label>
					<label>Password<input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required /></label>
					{error && <p className="form-error">{error}</p>}
					<button className="button button-dark full-width" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'} <span>↗</span></button>
				</form>
			</section>
		</main>
	);
}

export default AdminDashboard;
