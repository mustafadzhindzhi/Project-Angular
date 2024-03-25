const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils')

router.get('/customers', auth(), authController.getUserProfiles);
router.get('/customers/:userId', auth(), authController.getUserProjects);

module.exports = router;
