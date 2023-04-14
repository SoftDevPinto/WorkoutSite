// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project

// This is used for user signup 

import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// This code defines a custom hook called useSignup that provides a signup function for creating a new user account in the application. The hook also provides state variables for the loading state and any errors that may occur during the signup process.

// The useSignup hook uses the useState hook to initialize two state variables: error and isLoading. It also uses the useAuthContext hook to get the dispatch function from the AuthContext.

// The signup function is an async function that takes an email and password as arguments. It sends a POST request to an API endpoint with the provided email and password, and it processes the response from the API.

// If the response from the API is not successful (indicated by an ok property of false on the response object), the hook updates the isLoading state to false and sets the error state to the error property of the JSON object in the response.

// If the response from the API is successful, the hook saves the user object from the response to local storage and dispatches an action of type 'LOGIN' with the user object as the payload to update the AuthContext. The hook also sets the isLoading state to false.

// Finally, the useSignup hook returns an object with the signup function, the isLoading state, and the error state. This allows the signup functionality and its associated state to be shared and used in multiple components.

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
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

  return { signup, isLoading, error }
}