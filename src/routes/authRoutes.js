const express = require('express');
const router = express.shape = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;