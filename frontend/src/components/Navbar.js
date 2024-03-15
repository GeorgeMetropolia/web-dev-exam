import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated, isBgToggled, setIsBgToggled }) => {

  // Function to handle logout
	const handleClick = (e) => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

  // Function to toggle background color
	const handleToggleBg = () => {
		setIsBgToggled(!isBgToggled);
	};

	return (
		<header>
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
