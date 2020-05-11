const mongoose = require("mongoose")
const Schema = mongoose.Schema

const educationSchema = new Schema({
    degree: String,
    school: String,
    start: String,
    end: String,
    city: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Education = mongoose.model("Education", educationSchema)

module.exports = Education