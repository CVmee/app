const mongoose = require("mongoose")
const Schema = mongoose.Schema

const linkSchema = new Schema({
    label: String,
    link: String,
    cv: {
        type: Schema.Types.ObjectId,
        ref: 'CV'
    }
}, {
    timestamps: true
})

const Link = mongoose.model("Link", linkSchema)

module.exports = Link