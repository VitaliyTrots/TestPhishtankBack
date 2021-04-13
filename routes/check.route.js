const express = require('express');
const router = express.Router();
const checkController = require('../controllers/check.controller');

router.post('/', checkController.checkUrl);

module.exports = router;
