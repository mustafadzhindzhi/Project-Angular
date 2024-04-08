const { projectModel } = require('../models');
const mongoose = require('mongoose')

function getProjects(req, res, next) {
    const searchTerm = req.query.searchTerm;

    let query = {};

    if (searchTerm) {
        query = {
            $or: [
                { projectName: { $regex: searchTerm, $options: 'i' } },
                {smallDesc: {$regex:searchTerm, $options:'i'}},
                { industry: { $regex: searchTerm, $options: 'i' } },
                { deliverables: { $regex: searchTerm, $options: 'i' } },
                { systems: { $regex: searchTerm, $options: 'i' } },
                { bigDescription: { $regex: searchTerm, $options: 'i' } },
                { challenges: { $regex: searchTerm, $options: 'i' } },
                { approach: { $regex: searchTerm, $options: 'i' } },
            ],
        };
    }

    projectModel.find(query)
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
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ error: 'Invalid projectId format' });
    }

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    projectModel.findOne({_id: projectId})
    .then(project => {
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    })
    .catch(error => {
        console.error('Error fetching project:', error);
        next(error);
    });
}


function createProject(req, res, next) {
    const { projectName, smallDesc, bigDescription, images, mainPhoto, industry, deliverables, systems, challenges, approach } = req.body;

    const userId = req.user.id;

    const projectData = {
      projectName,
      smallDesc,
      bigDescription,
      images: images,
      mainPhoto: mainPhoto, 
      industry,
      deliverables,
      systems,
      challenges,
      approach,
      _ownerId: userId, 
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
    const { projectName, smallDesc, bigDescription, images, mainPhoto, industry, deliverables, systems, challenges, approach } = req.body;

    const update = {
        $set: {
            projectName: projectName,
            smallDesc: smallDesc,
            bigDescription: bigDescription,
            images: images,
            mainPhoto: mainPhoto, 
            industry: industry, 
            deliverables: deliverables, 
            systems: systems, 
            challenges: challenges,
            approach: approach
        }
    };

    projectModel.findByIdAndUpdate(projectId, update, { new: true, runValidators: true })
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
    
    projectModel.findByIdAndDelete(projectId)
        .then(project => {
            if (!project) {
                return res.status(404).json({ error: 'Project not found or user not authorized to delete' });
            }
            res.status(200).json({ message: 'Project deleted successfully' });
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
    const projectId = req.params.projectId;
    const userId = req.user.id;

    projectModel.findById(projectId)
    .then(project => {
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!project.likes) {
            project.likes = [];
        }

        project.likes.push(userId);
        return project.save()
            .then(() => {
                res.status(200).json({ message: 'Liked successful!' });
            });
    })
    .catch(error => {
        next(error);
    });
}

function unlike(req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.user.id;

    projectModel.findById(projectId)
    .then(project => {
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const index = project.likes.indexOf(userId);
        if (index !== -1) {
            project.likes.splice(index, 1);
        }

        return project.save()
            .then(() => {
                res.status(200).json({ message: 'Unliked successful!' });
            });
    })
    .catch(error => {
        next(error);
    });
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    editProject,
    deleteProject,
    getLatestProjects,
    like,
    unlike
}