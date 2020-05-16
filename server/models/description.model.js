const mongoose = require("mongoose")
const Schema = mongoose.Schema

const descriptionSchema = new Schema([
    {
        type: String,
        children: [{}]
    }
])

//const descriptionSchema = new Schema([{}])

const Description = mongoose.model("descriptionSchema", descriptionSchema)

module.exports = Description