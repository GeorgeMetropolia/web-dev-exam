import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContactUpdateForm from './contactUpdateForm';


const ContactDetails = ({ contact }) => {
	const navigate = useNavigate();
	const [isUpdating, setIsUpdating] = useState(false);

	const contactDelete = async (id) => {
		await fetch(`/api/contact/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	};

	const handleUpdate = async (updatedContact) => {
		const response = await fetch(`/api/contact/${contact._id}`, {
		  method: 'PUT',
		  body: JSON.stringify(updatedContact),
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		  },
		});
	
		if (response.ok) {
		  setIsUpdating(false); // Hide the form after updating
		  navigate('/login');
		}
	  };

	return (
		<div className="myservice-details">
			<p>{contact?.firstName  ?? 'no first name'}</p>
			<p>{contact?.lastName ?? 'no last name'}</p>
			<p>{contact?.email ?? 'no email'}</p>
			<p>{contact?.phone ?? 'no phone'}</p>
			<p>{contact?.address ?? 'no address'}</p>

			{isUpdating ? (
				<ContactUpdateForm contact={contact} onUpdate={handleUpdate} />
			) : (
				<>
			<span
				className="myservice-delete"
				onClick={() => {
					contactDelete(contact._id);
					navigate('/login');
				}}
			>
				delete
			</span>

			<span
				className="myservice-update"
				onClick={() => setIsUpdating(true)}
			>
				update
			</span>
			</>
			)}
		</div>
	);
};

export default ContactDetails;
