const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/users/:userId', userController.getUserById)

router.patch('/users/update-profile', userController.updateUserProfile);


module.exports = router;
