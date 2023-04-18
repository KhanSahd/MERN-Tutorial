import { useState, useEffect } from 'react'
import './App.css'
import Login from './component/login/Login';
import Register from './component/register/Register';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import Root from './component/Root/Root';
import Landingpage from './component/landingpage/Landingpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false);
  const [newtodo, setNewtodo] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  

  



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Landingpage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route index path="dashboard" element={<Dashboard />} />
        
      </Route>
      
    )
  );



  return (
    <div className="App">
      
      <RouterProvider router={router} />
      <ToastContainer />

    </div>
  )
}

export default App
