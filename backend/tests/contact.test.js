const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userModel');
const Contact = require('../models/contactModel');

/**
 *  Example of a contact object.
 */
const contacts = [
	{
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		phone: '123-456-7890',
		address: '456 Street',
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		phone: '123-456-7890',
		address: '456 Street',
	},
];

let token = null;

/**
 * Deletes all users from the database and creates a new user for testing purposes.
 * Sets the token for authentication.
 */
beforeAll(async () => {
	await User.deleteMany({});
	const result = await api
		.post('/api/users/signup')
		.send({ email: 'example@email.com', password: 'P@ssw0rd' });
	token = result.body.token;
});

describe('Contact Routes', () => {
	/**
	 * Deletes all contacts from the database and creates new contacts for testing purposes.
	 */
	beforeEach(async () => {
		await Contact.deleteMany({});
		await api
			.post('/api/contact')
			.set('Authorization', 'Bearer ' + token)
			.send(contacts[0])
			.send(contacts[1]);
	});

	/**
	 * Tests the GET /api/contact route.
	 * It should return all contacts as JSON.
	 */
	it('should return all contacts as JSON when GET /api/contact is called', async () => {
		await api
			.get('/api/contact')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	/**
	 * Tests the POST /api/contact route.
	 * It should create a new contact.
	 */
	it('should create a new contact when POST /api/contact is called', async () => {
		const newContact = {
			firstName: 'JohnTest',
			lastName: 'DoeTest',
			email: 'johnTest@example.com',
			phone: '123-456-7890',
			address: '456 Street',
		};
		await api
			.post('/api/contact')
			.set('Authorization', `Bearer ${token}`)
			.send(newContact)
			.expect(201);
	});

	/**
	 * Tests the GET /api/contact/:id route.
	 * It should return a single contact as JSON.
	 */
	it('should return a single contact as JSON when GET /api/contact/:id is called', async () => {
		const contact = await Contact.findOne({});
		await api
			.get(`/api/contact/${contact._id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	/**
	 * Tests the PATCH /api/contact/:id route.
	 * It should update a single contact.
	 */
	it('should update a single contact when PATCH /api/contact/:id is called', async () => {
		const contact = await Contact.findOne();
		const updatedContact = {
			firstName: 'JohnTestUpdated',
			lastName: 'DoeTestUpdated',
			email: 'johnTestUpdated@example.com',
			phone: '123-456-7890Updated',
			address: '456 Street Updated',
		};
		await api
			.put(`/api/contact/${contact._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(updatedContact)
			.expect(200);
		const updatedContactCheck = await Contact.findById(contact._id);
		expect(updatedContactCheck.toJSON()).toEqual(
			expect.objectContaining(updatedContact)
		);
	});

	/**
	 * Tests the DELETE /api/contact/:id route.
	 * It should delete a single contact.
	 */
	it('should delete a single contact when DELETE /api/contact/:id is called', async () => {
		const contact = await Contact.findOne({});
		await api
			.delete(`/api/contact/${contact._id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
		const contactCheck = await Contact.findById(contact._id);
		expect(contactCheck).toBeNull();
	});
});

/**
 * Closes the MongoDB connection after all tests have finished.
 */
afterAll(() => {
	mongoose.connection.close();
});
