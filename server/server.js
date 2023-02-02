const express = require('express')
const cors = require('cors')
const path = require('path')
const { logger } = require('./middleware/logger')
const { logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

connectDB() 

// Model import
const Todo = require('./models/Todo')

app.use(logger)

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))

// Splash page
app.use('/', require('./routes/root'))

app.use('/todos', require('./routes/todoRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

// Serve the 404
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

/**
 * Mongoose Setup
 */
const PORT = process.env.port || 6001

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

/*
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))
*/