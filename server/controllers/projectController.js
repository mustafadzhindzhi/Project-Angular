const { projectModel } = require('../models');

function getProjects(req, res, next) {
    projectModel.find()
        .populate({
            path: '_ownerId',
            select: 'username' 
        })
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
}

function getProject(req, res, next) {
    const { projectId } = req.params;

    console.log('Requested projectId:', projectId); // Log requested projectId

    projectModel.findById(projectId)
        .then(project => {
            res.json(project);
            console.log('Project:', project); // Log fetched project

        })
        .catch(next);
}


function createProject(req, res, next) {
    const { projectName, miniDescription, largeDescription, images } = req.body;
    const { _id: userId } = req.userId;

    const projectData = {
        projectName: projectName,
        miniDescription: miniDescription,
        largeDescription: largeDescription,
        images: images,
        userId: userId,
        likes: [userId]
    };

    projectModel.create(projectData)
        .then(project => {
            res.status(201).json({ project: project });
        })
        .catch(err => {
            console.error('Error creating project:', err);
            res.status(500).json({ error: 'Failed to create project' });
        });
}

function editProject(req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.userId._id;
    const { projectName, miniDescription, largeDescription, images } = req.body;

    const update = {
        $set: {
            projectName: projectName,
            miniDescription: miniDescription,
            largeDescription: largeDescription,
            images: images
        }
    };

    projectModel.findOneAndUpdate({ _id: projectId, userId: userId }, update, { new: true })
        .then(updatedProject => {
            if (!updatedProject) {
                return res.status(404).json({ error: 'Project not found or user not authorized to edit' });
            }
            res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
        })
        .catch(error => {
            console.error('Error updating project:', error);
            res.status(500).json({ error: 'Failed to update project' });
        });
}

function deleteProject(req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.userId._id;

    projectModel.findOne({ _id: projectId, userId: userId })
        .then(project => {
            if (!project) {
                return res.status(404).json({ error: 'Project not found or user not authorized to delete' });
            }

            return projectModel.deleteOne({ _id: projectId })
                .then(() => {
                    res.status(200).json({ message: 'Project deleted successfully' });
                });
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'Failed to delete project' });
        });
}

function getLatestProjects(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    projectModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('projectId userId')
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
}


function like(req, res, next) {
    const { projectId } = req.params;
    const { _id: userId } = req.params;

    console.log('like');

    projectModel.updateOne({ _id: projectId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next);
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    editProject,
    deleteProject,
    getLatestProjects,
    like,
}

