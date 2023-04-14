// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project

import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import WorkoutsContext from '../context/WorkoutContext';


export const WorkoutDetails = ({ workout }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [editedTitle, setEditedTitle] = useState(workout.title)
  const { dispatch } = useWorkoutsContext()

  const handleEdit = () => {
    setShowConfirm(true)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setEditedTitle(workout.title)
  }

  const handleConfirm = () => {
    dispatch({
      type: 'EDIT_WORKOUT',
      payload: {
        ...workout,
        title: editedTitle
      }
    })
    setShowConfirm(false)
  }

  const handleClick = () => {
    dispatch({
      type: 'DELETE_WORKOUT',
      payload: workout
    })
  }

  return (
    <div className="workout-details">
      {showConfirm ? (
        <>
          <h4>
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          </h4>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (lbs): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p><strong>Distance (in Km): </strong>{workout.distance}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <button className='edit' onClick={handleEdit}>Edit</button>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </>
      )}
    </div>
  )
}

export default WorkoutDetails