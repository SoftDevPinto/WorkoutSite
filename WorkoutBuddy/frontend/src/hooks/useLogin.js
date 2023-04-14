// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project


import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// This code defines a custom hook called useLogin that provides a login function for logging a user into the application. The hook also provides state variables for the loading state and any errors that may occur during the login process.

// The useLogin hook uses the useState hook to initialize two state variables: error and isLoading. It also uses the useAuthContext hook to get the dispatch function from the AuthContext.

// The login function is an async function that takes an email and password as arguments. It sends a POST request to an API endpoint with the provided email and password, and it processes the response from the API.

// If the response from the API is not successful (indicated by an ok property of false on the response object), the hook updates the isLoading state to false and sets the error state to the error property of the JSON object in the response.

// If the response from the API is successful, the hook saves the user object from the response to local storage and dispatches an action of type 'LOGIN' with the user object as the payload to update the AuthContext. The hook also sets the isLoading state to false.

// Finally, the useLogin hook returns an object with the login function, the isLoading state, and the error state. This allows the login functionality and its associated state to be shared and used in multiple components.

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}