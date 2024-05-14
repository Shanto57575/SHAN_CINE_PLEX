import mongoose from "mongoose"

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        maxLength: 15
    }
})


const Genre = mongoose.model('Genre', genreSchema)

export default Genre