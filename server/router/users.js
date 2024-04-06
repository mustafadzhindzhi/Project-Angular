const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils')

router.get('/profile', authController.getProfileInfo);
router.get('/profiles', authController.getAllProfiles);
router.put('/profile', authController.editProfileInfo);

module.exports = router;
