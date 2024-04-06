const router = require('express').Router();
const users = require('./users');
const projects = require('./projects');
const likes = require('./likes');
const test = require('./test');
const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares/authMid')

router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout',authMiddleware, authController.logout);

router.use('/users',authMiddleware, users);
router.use('/projects',authMiddleware, projects);
router.use('/likes',authMiddleware, likes);
router.use('/test',authMiddleware, test);

module.exports = router;