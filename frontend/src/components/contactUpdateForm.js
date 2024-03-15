import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUpdateForm = ({ contact, onUpdate }) => { 
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [address, setAddress] = useState(contact.address);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');


  //function to handle the form submission for update contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedContact = { firstName, lastName, email, phone, address };
    onUpdate(updatedContact);

    if (!token) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(`/api/contact/${contact._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedContact),
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
			<input
				type="text"
				onChange={(e) => setAddress(e.target.value)}
				value={address}
			/>

			<button>Add Contact</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};
export default ContactUpdateForm;
