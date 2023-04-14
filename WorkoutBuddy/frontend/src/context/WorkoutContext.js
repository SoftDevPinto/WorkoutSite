import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// This code defines a reducer function called workoutsReducer that is used to update the state of the WorkoutsContext in response to certain actions. A reducer is a pure function that takes the current state and an action as inputs and returns a new state.

// The workoutsReducer function has a switch statement that looks at the type property of the action object to determine which action to perform.

// If the type is 'SET_WORKOUTS', it returns a new object with a workouts property set to the payload of the action.

// If the type is 'CREATE_WORKOUT', it returns a new object with the workouts property set to a new array that includes the payload of the action as the first element and the current workouts array as the rest of the elements.

// If the type is 'DELETE_WORKOUT', it returns a new object with the workouts property set to a new array that includes only the elements of the current workouts array that do not have an _id property that matches the _id property of the payload of the action.

// If the type does not match any of these cases, it returns the current state without modifying it.

// The workoutsReducer function is typically used with the useReducer

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id )
      }
      case 'EDIT_WORKOUT':
        const editedWorkoutIndex = state.workouts.findIndex((workout) => workout.id === action.payload.id);
        const updatedWorkouts = [...state.workouts];
        updatedWorkouts[editedWorkoutIndex] = action.payload;
        return {
          ...state,
          workouts: updatedWorkouts,
        };
    default:
      return state
  }
}

// This code defines a component called WorkoutContextProvider that provides the WorkoutsContext to its children components. The WorkoutContextProvider component is a wrapper component that is typically placed at a high level in the component tree, so that its children components can access the WorkoutsContext using the useWorkoutsContext hook.

// The WorkoutContextProvider component uses the useReducer hook to create a state object and a dispatch function for updating the state. The useReducer hook takes a reducer function (in this case, the workoutsReducer function) and an initial state object as arguments.

// The WorkoutContextProvider component then returns a JSX element that includes a WorkoutsContext.Provider component from the react library. The WorkoutsContext.Provider component is used to provide the WorkoutsContext to its children components. The WorkoutsContext.Provider component takes a value prop that is an object with the state and dispatch function from the useReducer hook.

// The WorkoutContextProvider component renders its children within the WorkoutsContext.Provider component, so that the children components can access the WorkoutsContext using the useWorkoutsContext hook.

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}