import express from 'express';
import { addNewApp, getAllApps, deleteApp } from '../controllers/application.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', isAuthenticated, addNewApp)
router.get('/getall', getAllApps)
router.delete('/delete/:id', isAuthenticated, deleteApp)

export default router;