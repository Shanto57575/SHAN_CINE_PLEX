import asyncHandler from "express-async-handler"
import Genre from "../models/genre.model.js"

const createGenre = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: "Name is required" })
    }

    const existsGenre = await Genre.findOne({ name })
    if (existsGenre) {
        res.status(409)
        throw new Error(`Genre already exists`)
    } else {
        const newGenre = new Genre({ name })
        try {
            await newGenre.save()
            res.status(201)
            res.json({ newGenre, message: "New Genre Created successfully" })
        } catch (error) {
            res.status(500).json({ message: "Request Failed" })
        }
    }
})

const updateGenre = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { userId } = req.params
    const genre = await Genre.findById(userId)

    if (!name) {
        return res.status(400).json({ error: "No changes has been made!" })
    }

    if (!genre) {
        res.status(404)
        throw new Error("Genre Not Found")
    }

    genre.name = name

    try {
        await genre.save()
        res.status(200)
        res.json({ message: "Genre Updated Successfully", genre })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const allGenre = asyncHandler(async (req, res) => {
    const genres = await Genre.find({})
    try {
        res.status(200)
        res.json({ genres, message: "Got all the genres" })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const specificGenre = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        return res.status(404).json({ message: "Not Found" })
    }

    try {
        const getGenre = await Genre.findById(userId)
        if (!getGenre) {
            return res.status(404).json({ message: "Genre Not Found" })
        }
        res.status(200)
        res.json(getGenre)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteGenre = asyncHandler(async (req, res) => {
    const { userId } = req.params

    try {
        const genre = await Genre.findByIdAndDelete(userId)

        if (!genre) {
            return res.status(404).json({ message: "Genre Not Found" })
        } else {
            res.json({ genre, message: "Genre deleted successfully!" })
        }

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export {
    createGenre,
    updateGenre,
    allGenre,
    specificGenre,
    deleteGenre
}