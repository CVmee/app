const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cvSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const CV = mongoose.model("CV", cvSchema)

module.exports = CV