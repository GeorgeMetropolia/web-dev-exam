import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
// pages
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import NoteFolders from './components/noteFolders';
// import ContactForm from './components/ContactForm';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		Boolean(localStorage.getItem('token')) || false
	);
  const [isBgToggled, setIsBgToggled] = useState(false);
	return (
		<div className="App" style={{ backgroundColor: isBgToggled ? 'blue' : 'transparent' }}>
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