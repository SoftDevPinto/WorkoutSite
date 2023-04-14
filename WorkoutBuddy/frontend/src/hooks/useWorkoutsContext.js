import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// This code defines a custom hook called useWorkoutsContext that allows a component to access the WorkoutsContext. The WorkoutsContext is a context object that is created using the createContext function from the react library and is used to store and provide data related to workouts to components in a React application.

// The useWorkoutsContext hook uses the useContext hook from the react library to get the WorkoutsContext object from the React context. If the context is not available (i.e., if the component is not within a WorkoutsContext.Provider component), the hook throws an error.

// If the context is available, the hook returns the context object. This allows the component to access the data and functions in the WorkoutsContext using the destructuring syntax

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContext Provider')
    }
    
    return context
}