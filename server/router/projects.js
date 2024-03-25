const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { projectController } = require('../controllers');

router.route('/')
    .get(projectController.getProjects)
    .post(auth(), projectController.createProject)
    .put(auth(), projectController.editProject);

router.route('/:projectId')
    .get(projectController.getProject)
    .delete(auth(), projectController.deleteProject);

router.get('/latest', projectController.getLatestProjects);

module.exports = router;
