require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)


// Base URLS
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/cv.routes'))
app.use('/api', require('./routes/user.routes'))

app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

module.exports = app
