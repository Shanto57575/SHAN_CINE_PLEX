import express from 'express'
import { authorizeAdmin, verifyToken } from '../middlewares/authMiddleware.js'
import { allGenre, createGenre, deleteGenre, specificGenre, updateGenre } from '../controllers/genre.controller.js'

const genreRoutes = express.Router()

genreRoutes.route('/all-genres').get(verifyToken, authorizeAdmin, allGenre)
genreRoutes.route('/:userId').put(verifyToken, authorizeAdmin, updateGenre)
genreRoutes.route('/').post(verifyToken, authorizeAdmin, createGenre)
genreRoutes.route('/:userId').get(verifyToken, authorizeAdmin, specificGenre)
genreRoutes.route('/:userId').delete(verifyToken, authorizeAdmin, deleteGenre)

export default genreRoutes