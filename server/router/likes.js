const express = require('express');
const router = express.Router();
const {auth} = require('../utils');
const {projectController} = require('../controllers');

router.put('/:projectId', projectController.like);

module.exports = router;
