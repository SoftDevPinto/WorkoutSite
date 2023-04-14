const mongoose = require('mongoose')

const Schema = mongoose.Schema

// This code defines a new MongoDB schema called workoutSchema using the Schema constructor from the mongoose library. A schema is a way to define the structure and data types of a document in a MongoDB collection.

// The workoutSchema has five properties: title, reps, load, distance, and user_id. Each property is defined as a specific data type (String, Number) and has the required option set to true, which means that the field is required.

// The workoutSchema also has the timestamps option set to true, which means that MongoDB will automatically add the createdAt and updatedAt fields to the document with the current timestamp whenever the document is created or updated.

// This schema could be used to create a Workout model for a MongoDB collection that stores workout documents. The Workout model could then be used to create, read, update, and delete workout documents in the collection. For example, you could create a new workout document by calling the create method on the Workout model and passing an object with the title, reps, load, distance, and user_id properties as arguments.

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
