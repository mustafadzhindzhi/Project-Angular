const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { projectController } = require('../controllers');

router.get('/', projectController.getProjects);
router.get('/search', projectController.getProjects); 
router.get('/:projectId', projectController.getProject);
router.post('/', projectController.createProject);

module.exports = router
