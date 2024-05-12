import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import asyncHandler from "express-async-handler"

const verifyToken = asyncHandler(async (req, res, next) => {
    let token = req.cookies.Access_Token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Invalid token")
        }
    } else {
        res.status(401)
        throw new Error("Unauthorized Access, No Token Found")
    }
})

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("Not Authorized as an Admin!")
    }
}

export { verifyToken, authorizeAdmin }