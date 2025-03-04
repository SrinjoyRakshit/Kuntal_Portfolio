import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/error.js'
import { Application } from '../models/application.model.js'
import {v2 as cloudinary} from 'cloudinary'

export const addNewApp = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Software Icon/SVG is Required', 400))
    }
    const { svg } = req.files
    const { name } = req.body
    if(!name){
        return next(new ErrorHandler('Software Name is Required', 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
        folder: 'PORTFOLIO_SOFTWARES'
    })
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary error occurred")
    }

    const softwareApplication = await Application.create({
        name,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(201).json({
        success: true,
        message: 'Software Created Successfully',
        softwareApplication
    })
})

export const getAllApps = catchAsyncErrors(async(req, res, next) => {
    const softwareApplications = await Application.find()
    res.status(200).json({
        success: true,
        softwareApplications
    })
})

export const deleteApp = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params
    const softwareApplication = await Application.findById(id)
    if(!softwareApplication) {
        return next(new ErrorHandler('Software not found', 404))
    }
    const softwareApplicationsSvgId = softwareApplication.svg.public_id
    await cloudinary.uploader.destroy(softwareApplicationsSvgId)
    await softwareApplication.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Software Deleted Successfully'
    })
})