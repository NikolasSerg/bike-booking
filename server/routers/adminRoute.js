const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', shopsController.getAll);
router.post('/create', shopsController.create);

module.exports = router;