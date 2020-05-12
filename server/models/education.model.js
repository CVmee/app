const mongoose = require("mongoose")
const Schema = mongoose.Schema

const educationSchema = new Schema({
    degree: String,
    school: String,
    start: String,
    end: String,
    city: String,
    description: String,
    cv: {
        type: Schema.Types.ObjectId,
        ref: 'CV'
    }
}, {
    timestamps: true
})

const Education = mongoose.model("Education", educationSchema)

module.exports = Education