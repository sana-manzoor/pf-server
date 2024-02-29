//import express
const express=require('express')


//import controller function to resolve requests
const usercontroller=require('../Controller/userController')
const projectController=require('../Controller/projectController')


//multer import
const multerConfig=require('../Middlewares/projectsMiddleware')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multer = require('multer')

//create object for router class in express
const router=new express.Router()


//define various paths
router.post('/user/register',usercontroller.register)
router.post('/user/login',usercontroller.login)
router.post('/project/addproject',jwtMiddleware,multerConfig.single('project_image'),projectController.addProjects)
router.get('/user/projectlist',jwtMiddleware,usercontroller.userProjects)
router.get('/home/projects',usercontroller.homeProjects)
router.get('/project/projects',jwtMiddleware,usercontroller.allProjects)
router.put('/user/editProject/:id',jwtMiddleware,multerConfig.single('project_image'),usercontroller.editProject)
router.delete('/user/deleteproject/:id',jwtMiddleware,usercontroller.deleteProject)
router.put('/user/updateprofile/:id',jwtMiddleware,multerConfig.single('image'),usercontroller.profileUpdate)

module.exports=router