require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// express app 
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// This code connects to a MongoDB database using the connect method from the mongoose library and passing the URI of the database as an argument. The URI is stored in the MONG_URI environment variable.

// The connect method returns a promise that is resolved if the connection is successful and rejected if the connection fails.

// The then method of the promise is called with a callback function that starts the server using the listen method of the app object. The listen method takes in two arguments: the port number to listen on and a callback function that is called when the server is ready to start accepting requests. The port number is stored in the PORT environment variable.

// The catch method of the promise is called with a callback function that logs the error to the console if the connection fails.

// This code is typically used to start the server after the connection to the database has been established.

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })


