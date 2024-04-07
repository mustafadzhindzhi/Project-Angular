const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { projectController } = require('../controllers');

router.get('/', projectController.getProjects);
router.get('/search', projectController.getProjects); 
router.get('/:projectId', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:projectId', projectController.editProject);
router.delete('/:projectId', projectController.deleteProject);
router.put('/:projectId/likes', projectController.like);

module.exports = router
