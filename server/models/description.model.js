const mongoose = require("mongoose")
const Schema = mongoose.Schema

// AMAZING
const descriptionSchema = new Schema({ description: [{}] })


// Almost """""Good""""" one
// const descriptionSchema = new Schema(
//     [{
//         type: String,
//         children: [{}]
//     }]
// )

// const descriptionSchema = new Schema(
//     {
//         description: [{
//             type: String,
//             children: [{}]
//         }]
//     }
// )

//const descriptionSchema = new Schema([{}])

const Description = mongoose.model("descriptionSchema", descriptionSchema)

module.exports = Description