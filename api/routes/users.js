const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/auth');
const userController = require('../controllers/users');

//Signup: registration form
router.post('/signup', userController.userSignup )

//User list
router.get('/', userController.userList)

//User delete
router.delete('/:userid', checkAuth, userController.userDelete)

//user login 
router.post('/login', userController.userLogin)
    

module.exports = router;

