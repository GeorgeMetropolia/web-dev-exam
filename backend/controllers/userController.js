const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// log in an existing user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: 'Please provide email and password.',
		});
	}

	if (
		email != User.findOne({ email }) ||
		password != User.findOne({ password })
	) {
		return res.status(400).json({
			error: 'Email or password is incorrect',
		});
	}

	try {
		const user = await User.login(email, password);

		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Signin an new user
const signupUser = async (req, res) => {
	const { email, password, firstName, lastName, phoneNumber, role } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: 'Please provide email and password.',
		});
	}

	try {
		const user = await User.signup(
			email,
			password,
			firstName,
			lastName,
			phoneNumber,
			role
		);

		// create a token
		const token = createToken(user._id);

		res.status(201).json({ email, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
};

module.exports = { signupUser, loginUser, getUsers };
