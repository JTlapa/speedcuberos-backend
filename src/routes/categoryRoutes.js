const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', categoryController.getCategories);
router.post('/', verifyToken, isAdmin, categoryController.addCategory);

module.exports = router;