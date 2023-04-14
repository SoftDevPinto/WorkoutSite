// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project


import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

// This code defines a reducer function called authReducer that is used to update the state of the AuthContext in response to certain actions. A reducer is a pure function that takes the current state and an action as inputs and returns a new state.

//The authReducer function has a switch statement that looks at the type property of the action object to determine which action to perform. If the type is 'LOGIN', it returns a new object with a user property set to the payload of the action. If the type is 'LOGOUT', it returns a new object with the user property set to null. If the type does not match either of these cases, it returns the current state without modifying it.

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


// This code defines a function that provides an AuthContext for a React application. The AuthContext is implemented using the useReducer hook and is initialized with an object containing a single property user with a value of null.

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}  

