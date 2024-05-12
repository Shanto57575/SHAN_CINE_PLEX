import express from 'express';
import { createUser, getAllusers, getUserProfile, logOutUser, loginUser, updateUserProfile } from '../controllers/user.controller.js';
import { authorizeAdmin, verifyToken } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router()

userRoutes.route('/').get(verifyToken, authorizeAdmin, getAllusers)
userRoutes.route('/register').post(createUser)
userRoutes.route('/login').post(loginUser)
userRoutes.route('/logout').post(logOutUser)
userRoutes.route('/profile').get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile)

export default userRoutes