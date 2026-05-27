const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/categories/:categoryId', recordController.getByCategory);
router.get('/categories/:categoryId/top3', recordController.getTop3);

router.post('/', verifyToken, recordController.uploadRecord);

router.delete('/:id', verifyToken, isAdmin, recordController.deleteRecord);

module.exports = router;