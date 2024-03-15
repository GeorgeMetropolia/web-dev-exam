import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
// pages
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  //useState to check if user is authenticated
	const [isAuthenticated, setIsAuthenticated] = useState(
		Boolean(localStorage.getItem('token')) || false
	);
  //useState to check if background is toggled in the navbar
  const [isBgToggled, setIsBgToggled] = useState(false);
	return (
		<div className="App" style={{ backgroundColor: isBgToggled ? '#71ebf0' : 'transparent' }}>
			<BrowserRouter>
					<NavBar
						isAuthenticated={isAuthenticated}
						setIsAuthenticated={setIsAuthenticated}
            			isBgToggled={isBgToggled}
            			setIsBgToggled={setIsBgToggled}
					/>
					<Routes>
						<Route
							path="/"
							element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={
								isAuthenticated ? (
									<Navigate to="/" />
								) : (
									<Login setIsAuthenticated={setIsAuthenticated} />
								)
							}
						/>
						<Route
							path="/signup"
							element={
								isAuthenticated ? (
									<Navigate to="/" />
								) : (
									<Signup setIsAuthenticated={setIsAuthenticated} />
								)
							}
						/>
					</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;