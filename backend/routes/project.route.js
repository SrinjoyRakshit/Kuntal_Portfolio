import express from 'express';
import { addNewProject, getSingleProject, getAllProjects, deleteProject, updateProject } from '../controllers/project.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', isAuthenticated, addNewProject)
router.get('/get/:id', getSingleProject)
router.get('/getall', getAllProjects)
router.delete('/delete/:id', isAuthenticated, deleteProject)
router.put('/update/:id', isAuthenticated, updateProject)

export default router;