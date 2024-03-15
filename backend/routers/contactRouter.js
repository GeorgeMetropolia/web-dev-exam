const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth);

router.get('/', contactController.getContacts);

router.post('/', contactController.addContact);

router.get('/:id', contactController.getContact);

router.delete('/:id', contactController.deleteContact);

router.put('/:id', contactController.updateContact);

module.exports = router;
