const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser, test_loginUser } = require('../controllers/userController')

//POST new user signup
router.post('/signup', signupUser);

//POST user login
router.post('/login', loginUser)

//POST user logout
router.post('/logout', logoutUser)

//POST test account login
router.post('/test/login', test_loginUser)

module.exports = router;
