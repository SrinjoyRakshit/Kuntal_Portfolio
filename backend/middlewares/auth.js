import { User } from '../models/user.model.js'
import { catchAsyncErrors } from './catchAsyncErrors.js'
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler('Login first to access your panel.', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next()
})