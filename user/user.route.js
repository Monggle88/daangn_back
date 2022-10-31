const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');
const userController = new UserController();
const loginMiddleware = require('../middlewares/authLoginUserMiddleware')

router.post('/signup', loginMiddleware, userController.signup);
router.post('/login', loginMiddleware, userController.login);
router.post('/signup/emailDup', userController.emailDup);
router.post('/signup/nicknameDup', userController.nicknameDup);

module.exports = router;