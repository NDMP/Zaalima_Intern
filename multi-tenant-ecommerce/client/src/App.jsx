import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/customer/Home';
import AdminDashboard from './pages/admin/AdminDashboard';

const NotFound = () => (
	<main className="center-page">
		<p className="eyebrow">404</p>
		<h1>Page not found</h1>
		<Link className="button button-dark" to="/">Back home</Link>
	</main>
);

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/admin" element={<AdminDashboard />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
