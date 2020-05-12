const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employmentSchema = new Schema({
    title: String,
    employer: String,
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

const Employment = mongoose.model("Employment", employmentSchema)

module.exports = Employment