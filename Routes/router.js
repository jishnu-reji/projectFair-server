const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

const router = new express.Router()


//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add project
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//all prjects
router.get('/allprojects',jwtMiddleware,projectController.getAllProjects)

//all prjects
router.get('/userprojects',jwtMiddleware,projectController.getuserProjects)

//all prjects
router.get('/homeprojects',projectController.getHomeProjects)

router.put('/editproject/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

router.delete('/removeproject/:pid',jwtMiddleware,projectController.removeProject)

router.put('/edituser',jwtMiddleware,multerConfig.single('profileImage'),userController.editUser)


//export router
module.exports = router