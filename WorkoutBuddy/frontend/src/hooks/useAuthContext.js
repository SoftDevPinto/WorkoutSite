// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project


import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// This code defines a custom hook called useAuthContext that allows a component to access the AuthContext. The AuthContext is a context object that is created using the createContext function from the react library and is used to store and provide data related to authentication to components in a React application.

// The useAuthContext hook uses the useContext hook from the react library to get the AuthContext object from the React context. If the context is not available (i.e., if the component is not within an AuthContext.Provider component), the hook throws an error.

// If the context is available, the hook returns the context object. This allows the component to access the data and functions in the AuthContext using the destructuring syntax

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an WorkoutsContext Provider')
    }
    
    return context
}