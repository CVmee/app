const mongoose = require('mongoose')

mongoose
    // .connect(`mongodb://localhost/${process.env.LOCALDB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose