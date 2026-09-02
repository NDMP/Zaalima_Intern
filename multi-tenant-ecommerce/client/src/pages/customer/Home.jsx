import { Link } from 'react-router-dom';

const highlights = [
	{ value: 'Curated', label: 'products from independent stores' },
	{ value: 'One cart', label: 'for your whole shopping trip' },
	{ value: 'Local', label: 'sellers with a personal touch' },
];

function Home() {
	return (
		<div className="site-shell">
			<header className="topbar">
				<Link className="brand" to="/">market<span>place</span></Link>
				<nav>
					<a href="#discover">Discover</a>
					<a href="#about">About</a>
					<Link className="nav-admin" to="/admin">Admin sign in</Link>
				</nav>
			</header>

			<main>
				<section className="hero" id="discover">
					<div className="hero-copy">
						<p className="eyebrow">A better way to shop small</p>
						<h1>Good things,<br /><em>all in one place.</em></h1>
						<p className="hero-text">Explore thoughtful products from stores with something worth sharing.</p>
						<button className="button button-coral" type="button">Browse the collection <span>↗</span></button>
					</div>
					<div className="hero-art" aria-label="Abstract marketplace illustration">
						<div className="art-card art-card-main"><span>01</span><strong>Made<br />with care</strong></div>
						<div className="art-card art-card-small">✦</div>
						<div className="art-line">SHOP SMALL <span>✳</span> LIVE WELL</div>
					</div>
				</section>

				<section className="highlights" id="about">
					{highlights.map((item) => (
						<div className="highlight" key={item.value}>
							<strong>{item.value}</strong>
							<span>{item.label}</span>
						</div>
					))}
				</section>
			</main>

			<footer><span>marketplace © 2026</span><span>Built for the everyday find.</span></footer>
		</div>
	);
}

export default Home;
