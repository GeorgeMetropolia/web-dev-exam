import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ContactDetails = ({ contact }) => {
	const navigate = useNavigate();

	const contactDelete = async (id) => {
		await fetch(`/api/contact/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	};

	return (
		<div className="contact-details">
			<text>{contact?.firstName ?? 'no first name'}</text>
			<text>{contact?.lastName ?? 'no last name'}</text>
			<text>{contact?.email ?? 'no email'}</text>
			<text>{contact?.phone ?? 'no phone'}</text>
			<text>{contact?.address ?? 'no address'}</text>
			{/* <p>
				{formatDistanceToNow(
					new Date(
						contact?.date === undefined ? new Date() : contact.date ?? new Date()
					),
					{ addSuffix: true }
				)}
			</p> */}
			<span
				className="material-symbols-outlined"
				onClick={() => {
					contactDelete(contact._id);
					navigate('/login');
				}}
			>
				delete
			</span>
		</div>
	);
};

export default ContactDetails;
