import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUpdateForm = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [error, setError] = useState(null);
	const token = localStorage.getItem('token');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			setError('You must be logged in');
			return;
		}

		const contact = { firstName, lastName, email, phone, address };
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(contact),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}
		if (response.ok) {
			setFirstName('');
			setLastName('');
			setEmail('');
			setPhone('');
			setAddress('');
			setError(null);
			navigate('/login');
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New contact</h3>

			<label>First Name:</label>
			<input
				type="text"
				onChange={(e) => setFirstName(e.target.value)}
				value={firstName}
			/>

			<label>Last Name:</label>
			<input
				type="text"
				onChange={(e) => setLastName(e.target.value)}
				value={lastName}
			/>

			<label>Email:</label>
			<input
				type="text"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>

			<label>Phone:</label>
			<input
				type="text"
				onChange={(e) => setPhone(e.target.value)}
				value={phone}
			/>

			<label>Address:</label>

			<button>Add Contact</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};
export default ContactUpdateForm;
