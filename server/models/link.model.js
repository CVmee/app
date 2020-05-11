const mongoose = require("mongoose")
const Schema = mongoose.Schema

const linkSchema = new Schema({
    label: String,
    link: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Link = mongoose.model("Link", linkSchema)

module.exports = Link