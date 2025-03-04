import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/error.js'
import {v2 as cloudinary} from 'cloudinary'
import { Project } from '../models/project.model.js'

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Project banner is Required', 400))
    }
    const { projectBanner } = req.files
    const { title, description, gitRepoLink, downloadLink, technologies } = req.body
    if(!title || !description || !gitRepoLink ||  !downloadLink || !technologies) {
        return next(new ErrorHandler('Please fill in all fields', 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(projectBanner.tempFilePath, {
        folder: 'PROJECT_IMAGES'
    })
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary error occurred")
        return next(new ErrorHandler('Failed to upload project banner', 500))
    }
    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        downloadLink,
        technologies,
        projectBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(201).json({
        success: true,
        message: 'Project added successfully',
        project
    })
})

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id)
    if(!project) {
        return next(new ErrorHandler('Project not found', 404))
    }
    res.status(200).json({
        success: true,
        project
    })
})

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).json({
        success: true,
        projects
    })
})

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params
    const project = await Project.findById(id)
    if(!project) {
        return next(new ErrorHandler('Project not found', 404))
    }
    await Project.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
    })
})

export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        downloadLink: req.body.downloadLink,
        technologies: req.body.technologies,
    }
    if(req.files && req.files.projectBanner) {
        const projectBanner = req.files.projectBanner
        const project = await Project.findById(req.params.id)
        const projectBannerId = project.projectBanner.public_id
        await cloudinary.uploader.destroy(projectBannerId)
        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath, 
            { folder: 'PROJECT_IMAGES' }
        )
        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    }
    const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        project
    })
})