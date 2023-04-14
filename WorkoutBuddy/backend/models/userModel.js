const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// This code defines a new MongoDB schema called userSchema using the Schema constructor from the mongoose library. A schema is a way to define the structure and data types of a document in a MongoDB collection.

// The userSchema has two properties: email and password. The email property is defined as a string and has the required and unique options set to true, which means that the email field is required and must be unique across all documents in the collection. The password property is defined as a string and has the required option set to true, which means that the password field is required.

// This schema could be used to create a User model for a MongoDB collection that stores user documents. The User model could then be used to create, read, update, and delete user documents in the collection. For example, you could create a new user document by calling the create method on the User model and passing an object with the email and password properties as arguments.

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// This code defines a static method called signup on the userSchema object using the statics property. A static method is a method that is attached to the model class itself, rather than to a specific instance of the model. This means that you can call the signup method directly on the User model without having to create an instance of the User model first.

// The signup method is an async function which means that it can use the await keyword to wait for a promise to be resolved. The method takes in two arguments: email and password.

// Inside the function, the code first checks if either the email or password is falsy (empty or undefined). If either of them is falsy, the function throws an error with an error message.

// The function then checks if the email is a valid email using the isEmail method from the validator library. If the email is not valid, the function throws an error with an error message.

// The function then checks if the password is a strong password using the isStrongPassword method from the validator library. If the password is not strong enough, the function throws an error with an error message.

// The function then checks if a user with the same email already exists in the database by calling the findOne method on the this object (which refers to the model) with an object containing the email property as the query argument. If a user with the same email already exists, the function throws an error with an error message.

// If all the validation checks pass, the function generates a salt using the genSalt method from the bcrypt library, and then uses the salt to hash the password using the hash method from the bcrypt library. The function then creates a new user document by calling the create method on the this object (which refers to the model) with an object containing the email and password properties as arguments. The hashed password is stored in the password field of the new user document.

// Finally, the function returns the newly created user object.

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// This code defines a static method called login on the userSchema object using the statics property. A static method is a method that is attached to the model class itself, rather than to a specific instance of the model. This means that you can call the login method directly on the User model without having to create an instance of the User model first.

// The login method is an async function which means that it can use the await keyword to wait for a promise to be resolved. The method takes in two arguments: email and password.

// Inside the function, the code first checks if either the email or password is falsy (empty or undefined). If either of them is falsy, the function throws an error with an error message.

// The function then fetches the user document from the database by calling the findOne method on the this object (which refers to the model) with an object containing the email property as the query argument. If the user document is not found, the function throws an error with an error message.

// The function then compares the password argument to the password field of the user document using the compare method from the bcrypt library. If the password argument does not match the password field of the user document, the function throws an error with an error message.

// If the password argument matches the password field of the user document, the function returns the user object.

// static login method
userSchema.statics.login = async function(email, password) {
    
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)