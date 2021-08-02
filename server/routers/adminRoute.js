const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

router.get('/', bikeController.getAll);
router.post('/', bikeController.add);
router.delete('/', bikeController.del);
router.patch('/', bikeController.change);

module.exports = router;