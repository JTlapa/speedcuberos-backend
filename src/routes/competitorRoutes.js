const express = require('express');
const router = express.Router();
const competitorController = require('../controllers/competitorController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/:id', competitorController.getCompetitor);
router.post('/', verifyToken, isAdmin, competitorController.addCompetitor);

module.exports = router;