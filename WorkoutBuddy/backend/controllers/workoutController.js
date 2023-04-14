const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// This code defines a function called getWorkouts that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code extracts the _id property from the user property of the req object. This user property is likely set by a previous middleware function that authenticated the user and attached the user object to the request object.

// The function then calls the find method on the Workout model with the user_id as the query argument. This find method is likely a static method on the Workout class that is used to find all workouts that belong to the user with the given user_id. The sort method is then called on the returned array of workouts to sort them by the createdAt property in descending order.

// Finally, the function sends a response with a status code of 200 (OK) and the array of workouts as the response body.

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// This code defines a function called getWorkout that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures the id property from the params property of the req object. This params property is an object that contains the route parameters from the request URL, which are named segments of the URL path that are used to capture values.

// The function then checks if the id is a valid MongoDB ObjectId by calling the isValid method on the ObjectId object from the mongoose library and passing the id as an argument. If the id is not a valid ObjectId, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// If the id is valid, the function calls the findById method on the Workout model with the id as the argument. This findById method is likely a static method on the Workout class that is used to find a workout by its unique _id property.

// If the findById method returns a workout, the function sends a response with a status code of 200 (OK) and the workout object as the response body. If the findById method does not return a workout, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// This code defines a function called createWorkout that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures title, load, reps, and distance from the body property of the req object. This is a way to extract the values of these properties from the request body.

// The function then checks if any of these properties are falsy (empty or undefined). If any of them are, it adds their name to an array called emptyFields.

// If the emptyFields array is not empty, the function sends a response with a status code of 400 (Bad Request) and an error message along with the emptyFields array in the response body.

// If all the required fields are present, the function tries to create a new workout by calling the create method on the Workout model with an object containing the title, load, reps, distance, and user_id properties as arguments. The user_id is extracted from the user property of the req object, which is likely set by a previous middleware function that authenticated the user and attached the user object to the request object.

// If the create method returns successfully, the function sends a response with a status code of 200 (OK) and the newly created workout object as the response body. If the create method throws an error, the catch block will execute and send a response with a status code of 400 (Bad Request) and the error message in the response body.

// create new workout
const createWorkout = async(req, res) => {
    const {title, load, reps, distance} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!distance){
        emptyFields.push('distance')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const workout =  await Workout.create({title, load, reps, distance, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// This code defines a function called deleteWorkout that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures the id property from the params property of the req object. This params property is an object that contains the route parameters from the request URL, which are named segments of the URL path that are used to capture values.

// The function then checks if the id is a valid MongoDB ObjectId by calling the isValid method on the ObjectId object from the mongoose library and passing the id as an argument. If the id is not a valid ObjectId, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// If the id is valid, the function calls the findOneAndDelete method on the Workout model with the id as the query argument. This findOneAndDelete method is likely a static method on the Workout class that is used to find and delete a workout by its unique _id property.

// If the findOneAndDelete method returns a workout, the function sends a response with a status code of 200 (OK) and the deleted workout object as the response body. If the findOneAndDelete method does not return a workout, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// This code defines a function called updateWorkout that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures the id property from the params property of the req object. This params property is an object that contains the route parameters from the request URL, which are named segments of the URL path that are used to capture values.

// The function then checks if the id is a valid MongoDB ObjectId by calling the isValid method on the ObjectId object from the mongoose library and passing the id as an argument. If the id is not a valid ObjectId, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// If the id is valid, the function calls the findOneAndUpdate method on the Workout model with the id as the query argument and an object containing the updates as the update argument. This findOneAndUpdate method is likely a static method on the Workout class that is used to find and update a workout by its unique _id property. The update argument is created by spreading the req.body object, which is an object containing the new values for the properties to be updated.

// If the findOneAndUpdate method returns a workout, the function sends a response with a status code of 200 (OK) and the updated workout object as the response body. If the findOneAndUpdate method does not return a workout, the function sends a response with a status code of 404 (Not Found) and an error message in the response body.

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)

}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}