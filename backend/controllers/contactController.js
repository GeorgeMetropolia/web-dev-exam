const mongoose = require('mongoose');
const Contact = require('../models/contactModel');

// get all Contact
const getContacts = async (req, res) => {
	const user_id = req.user._id;

	try {
		const contacts = await Contact.find({ user_id }).sort({ createdAt: -1 });
		res.status(200).json(contacts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// Add one Contact
const addContact = async (req, res) => {
	const { firstName, lastName, email, phone, address } = req.body;

	try {
		const user_id = req.user._id;
		const newContact = new Contact({
			firstName,
			lastName,
			email,
			phone,
			address,
			user_id,
		});
		await newContact.save();
		res.status(201).json(newContact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// Get Book by ID
const getContact = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such contact' });
	}

	try {
		const user_id = req.user._id;
		const contact = await Contact.findById(id).where('user_id').equals(user_id);
		if (!contact) {
			return res.status(404).json({ message: 'contact not found' });
		}
		res.status(200).json(contact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

// Delete Contact by ID
const deleteContact = async (req, res) => {
	const { id } = req.params;
	try {
		const user_id = req.user._id;
		const contact = await Contact.findOneAndDelete({
			_id: id,
			user_id: user_id,
		});
		if (!contact) {
			return res.status(404).json({ message: 'contact not found' });
		}
		res.status(200).json({ message: 'contact deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

//Update  by ID
const updateContact = async (req, res) => {
	const { id } = req.params;
	try {
		const user_id = req.user._id;
		const contact = await Contact.findOneAndUpdate(
			{ _id: id, user_id: user_id },
			{ ...req.body },
			{ new: true }
		);
		if (!contact) {
			return res.status(404).json({ message: 'contact not found' });
		}
		res.status(200).json(contact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

module.exports = {
	getContacts,
	addContact,
	getContact,
	deleteContact,
	updateContact,
};
