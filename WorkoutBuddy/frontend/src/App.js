// WorkoutBuddy 
// Chris Pinto
// Final Sprint - Passion Project


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';


// This function defines a React component called App that is a top-level component in a React application.

// The App component uses the useAuthContext hook to get the user object from the AuthContext. It then returns a JSX element that defines the structure of the application.

// The JSX element includes a BrowserRouter component from the react-router-dom library, which provides routing functionality to the application. Inside the BrowserRouter, there is a Navbar component and a div element with the class pages.

// Inside the div element with the class pages, there is a Routes component from the react-router-dom library and several Route components. Each Route component defines a path and an element to render for that path.

// If the user object is truthy (i.e., not null), the Route component with a path of '/' will render the Home component. If the user object is null, the Route component will render a Navigate component that will navigate the user to the '/login' path.

// Similarly, the Route components with paths of '/login' and '/signup' will only render the Login and Signup components, respectively, if the user object is null. If the user object is truthy, the Route components will render a Navigate component that will navigate the user back to the '/' path.

// Overall, this App component sets up the routing for the application and controls which components are rendered based on the value of the user object in the AuthContext.

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" /> }
            />
            <Route 
              path='/signup'
              element={!user ? <Signup/> : <Navigate to="/" /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
