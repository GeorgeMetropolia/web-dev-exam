import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
	const [isBgToggled, setIsBgToggled] = useState(false);

	const handleClick = (e) => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	const handleToggleBg = () => {
		setIsBgToggled(!isBgToggled);
	};

	return (
		<header style={{ backgroundColor: isBgToggled ? 'blue' : 'transparent' }}>
			<div className="container">
				{isAuthenticated && (
					<Link to="/">
						<h1>Home</h1>
					</Link>
				)}

				<nav>
					{isAuthenticated && (
						<div>
							<span>
								{JSON.parse(localStorage.getItem('user'))?.email ??
									'(email not found)'}
							</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
					{!isAuthenticated && (
						<div>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
					<button onClick={handleToggleBg}>Toggle Background Color</button>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
