import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcrypt'

const createUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All Fileds are required")
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(409)
        throw new Error("User already exists")
    }

    const newUser = new User({ username, email, password })

    const { password: _, ...user } = newUser._doc

    try {
        await newUser.save()
        generateToken(res, newUser._id)
        res.status(201).json({ messsage: "Signed Up successfully", user })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // if (!email || !password) {
    //     res.status(400)
    //     throw new Error("All Fields are required")
    // }

    const existingUser = await User.findOne({ email: email })
    console.log(existingUser)

    if (existingUser) {

        const isPasswordValid = await existingUser.matchPassowrd(password)
        console.log(isPasswordValid)
        if (isPasswordValid) {
            generateToken(res, existingUser._id)

            const { password: _, ...user } = existingUser._doc
            res.status(200).json({
                message: "Signed in successfully!",
                user
            })
        }
        else {
            res.status(400)
            throw new Error("Invalid Email Or Password!")
        }
    } else {
        res.status(404)
        throw new Error("user not found")
    }
})

const logOutUser = asyncHandler(async (req, res) => {
    res.cookie("Access_Token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "Logged out successfully!" })
})

const getAllusers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ message: "Got all the users", users })
})

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    const { password: _, ...newUser } = user._doc
    console.log(user)
    if (!user) {
        res.status(404)
        throw new Error("User Not Found")
    } else {
        res.status(200).json({ user: newUser })
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()
        res.status(200).json({
            message: "Updated User successfully",
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error(`user not found`)
    }
})

export {
    createUser,
    loginUser,
    logOutUser,
    getAllusers,
    getUserProfile,
    updateUserProfile
}
