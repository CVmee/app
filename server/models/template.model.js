const mongoose = require("mongoose")
const Schema = mongoose.Schema

const templateSchema = new Schema({
    name: String,
}, {
    timestamps: true
})

const Template = mongoose.model("Template", templateSchema)

module.exports = Template