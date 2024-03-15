import { useNavigate } from 'react-router-dom';


const ContactDetails = ({ contact }) => {
	const navigate = useNavigate();

	const contactDelete = async (id) => {
		await fetch(`/api/contact/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	};

	const contactUpdate = async (id) => {
		await fetch(`/api/contact/${id}`, {
			method: 'PUT',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	};

	return (
		<div className="myservice-details">
			<p>{contact?.firstName  ?? 'no first name'}</p>
			<p>{contact?.lastName ?? 'no last name'}</p>
			<p>{contact?.email ?? 'no email'}</p>
			<p>{contact?.phone ?? 'no phone'}</p>
			<p>{contact?.address ?? 'no address'}</p>

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
				onClick={() => {
					contactUpdate(contact._id);
					navigate('/login');
				}}
			>
				update
			</span>
		</div>
	);
};

export default ContactDetails;
