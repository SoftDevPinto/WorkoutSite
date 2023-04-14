// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project


import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

// This code defines a custom hook called useLogout that provides a logout function for logging a user out of the application.

// The useLogout hook uses the useAuthContext hook to get the dispatch function from the AuthContext, and it also uses the useWorkoutsContext hook to get the dispatch function from the WorkoutsContext.

// The logout function removes the user object from local storage and dispatches an action of type 'LOGOUT' to the AuthContext to update the context state. It also dispatches an action of type 'SET_WORKOUTS' to the WorkoutsContext with a payload of null, which clears the workouts data from the context.

// Finally, the useLogout hook returns an object with the logout function, which allows the logout functionality to be shared and used in multiple components.


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from storage 
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}