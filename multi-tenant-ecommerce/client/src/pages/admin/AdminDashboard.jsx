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
		const firstName = user.name?.split(' ')[0] || 'there';
		const stats = [
			{ label: 'Active stores', value: '0', detail: 'Ready to onboard' },
			{ label: 'Orders today', value: '0', detail: 'No new orders yet' },
			{ label: 'Customers', value: '0', detail: 'Across all stores' },
		];

		return (
			<main className="admin-page">
				<header className="admin-header">
					<Link className="brand" to="/">market<span>place</span></Link>
					<div className="admin-header-actions"><span className="admin-status"><i /> Live overview</span><button className="text-button" type="button" onClick={() => { setUser(null); sessionStorage.removeItem('adminToken'); }}>Sign out <span>-&gt;</span></button></div>
				</header>
				<section className="admin-content">
					<div className="admin-intro"><div><p className="eyebrow">Control room / 01</p><h1>Good morning, {firstName}.</h1><p className="muted">A clear view of your marketplace, ready when you are.</p></div><div className="date-stamp">04<br /><span>SEP 2026</span></div></div>
					<div className="stat-grid">{stats.map((stat) => <div className="stat-card" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.detail}</small></div>)}</div>
					<div className="dashboard-lower"><div className="empty-state"><div className="empty-icon">+</div><div><strong>Your dashboard is ready.</strong><p>Connect your stores and products to see activity here.</p></div><button className="outline-button" type="button">Set up a store <span>-&gt;</span></button></div><aside className="quick-note"><p className="eyebrow">Next up</p><strong>Build your first storefront</strong><p>Give your customers somewhere memorable to shop.</p><span className="note-number">02</span></aside></div>
				</section>
			</main>
		);
	}

	return (
		<main className="login-page">
			<div className="login-aside"><Link className="brand" to="/">market<span>place</span></Link><div className="login-quote"><p className="eyebrow">The admin desk</p><h1>Make room for <em>what matters.</em></h1><p>One calm place to keep your marketplace moving.</p></div><span className="aside-index">MP / ADMIN / 01</span></div>
			<section className="login-panel"><p className="eyebrow">Admin access</p><h2>Welcome back.</h2><p className="muted">Sign in to manage your marketplace.</p><form onSubmit={login}><label>Email<input type="email" value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} required /></label><label>Password<input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required /></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark full-width" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'} <span>-&gt;</span></button></form><p className="login-footer">Private workspace <span>*</span> Secure access</p></section>
		</main>
	);
}

export default AdminDashboard;
