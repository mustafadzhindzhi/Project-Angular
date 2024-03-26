const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils')

router.get('/users', auth(), authController.getUserProfiles);
router.get('/users/:userId', auth(), authController.getUserProjects);

module.exports = router;
