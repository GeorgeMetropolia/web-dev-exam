const express = require('express');
const router = express.Router();

const {
  loginUser,
  signupUser,
  getUsers,
} = require('../controllers/userController');

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/', getUsers); // temporary

module.exports = router;
