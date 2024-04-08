const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.get('/profile', authController.getProfileInfo);
router.get('/profiles', authController.getAllProfiles);
router.put('/profile', authController.editProfileInfo);

module.exports = router;
