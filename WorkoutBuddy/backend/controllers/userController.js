const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// This code defines a function called loginUser that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures email and password from the body property of the req object. This is a way to extract the email and password values from the request body.

// Next, the function calls the login method on the User object with the email and password as arguments. This login method is likely a static method on the User class that is responsible for authenticating the user with the given email and password. If the authentication is successful, the method should return the user object.

// If the login method returns successfully, the function creates a JSON Web Token (JWT) by calling the createToken function with the _id property of the user object as an argument. This JWT is then included in the response body along with the email and sent back to the client.

// If the login method throws an error, the catch block will execute and send a response with a status code of 400 (Bad Request) and the error message in the response body.

// login user
const loginUser = async (req, res) => {
    const { email, password} = req.body
    
    try {
        const user = await User.login(email, password)
        
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// This code defines a function called signupUser that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in two arguments: req and res.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body.

// Inside the function, the code destructures email and password from the body property of the req object. This is a way to extract the email and password values from the request body.

// Next, the function calls the signup method on the User object with the email and password as arguments. This signup method is likely a static method on the User class that is responsible for creating a new user with the given email and password. If the creation is successful, the method should return the newly created user object.

// If the signup method returns successfully, the function creates a JSON Web Token (JWT) by calling the createToken function with the _id property of the user object as an argument. This JWT is then included in the response body along with the email and sent back to the client.

// If the signup method throws an error, the catch block will execute and send a response with a status code of 400 (Bad Request) and the error message in the response body.

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
    
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { signupUser, loginUser }
