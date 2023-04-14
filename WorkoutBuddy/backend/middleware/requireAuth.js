const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// This code defines a function called requireAuth that is an async function which means that it can use the await keyword to wait for a promise to be resolved. This function is intended to be used as an Express middleware function, which means it takes in three arguments: req, res, and next.

// The req argument is an object that represents the incoming HTTP request, and it contains information such as the request method, the headers, and the body. The res argument is an object that represents the outgoing HTTP response, and it has methods for setting the response status, headers, and body. The next argument is a function that is called to pass the request to the next middleware function in the chain.

// Inside the function, the code extracts the authorization header from the headers property of the req object. If the authorization header is not present, the function sends a response with a status code of 401 (Unauthorized) and an error message in the response body.

// If the authorization header is present, the function splits the string by the space character to separate the type of authorization (e.g. "Bearer") from the actual token, and then extracts the token from the resulting array.

// The function then tries to verify the token using the verify method from the jwt library and passing the token and the application's secret as arguments. If the token is valid, the verify method should return an object containing the payload of the token.

// If the verify method returns successfully, the function fetches the user object from the database by calling the findOne method on the User model with the _id property of the returned object as the query argument. The select method is then called on the returned user object to only include the _id property in the returned

const requireAuth = async (req, res, next) => {

    // verify authentication 
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select(_id)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth