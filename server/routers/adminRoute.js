const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

router.get('/bikes', bikeController.getAll);
router.post('/add', bikeController.add);

module.exports = router;