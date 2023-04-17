import { useState, useEffect } from 'react'
import './App.css'
import Login from './component/login/Login';
import Register from './component/register/Register';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import Root from './component/Root/Root';
import Landingpage from './component/landingpage/Landingpage';

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false);
  const [newtodo, setNewtodo] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[user, setUser] = useState({});

  useEffect(() => {
    if((loggedIn)){
      getTodos();
    }
  }, [loggedIn])


  
  
  const login = async () => {
    await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data){
        setLoggedIn(true)
        setUser(data)
        console.log(data)
      } else {
        console.log('error')
      }
    })
    .catch((err) => console.error('error: ' + err))
    setEmail('')
    setPassword('')
  }
  

  const getTodos = async () => {
    await fetch('http://localhost:8000/api/goals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      
    })
    .then((res) => res.json())
    .then((data) => setTodos(data))
    .catch((err) => console.error('error: ' + err))
    
  }

  const deleteTodo = async (id, e) => {
    await fetch('http://localhost:8000/api/goals/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
    setTodos(todos.filter((todo) => todo._id !== id));
  }

  const createTodo = async (text) => {
    await fetch('http://localhost:8000/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text })
    }).then
    (res => res.json())
    .then(data => setTodos([...todos, data]))
  }

  const completeTodo = async (id) => { 
    const data = await fetch('http://localhost:8000/api/goals/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    }).then(res => res.json())
    .then(setTodos(todos.map(todo => {
      if (todo._id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })))
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Landingpage />} />
        <Route path="login" element={<Login login={login} setEmail={setEmail} setPassword={setPassword} />} />
        <Route path="register" element={<Register />} />
        <Route index path="dashboard" element={<Dashboard />} />
      </Route>
      
    )
  );



  return (
    <div className="App">
      {/* {!loggedIn ? (
        <div className='app-log-reg'>
          <Register />
          <Login login={login} setEmail={setEmail} setPassword={setPassword} />
        </div>
      ) : (
        <>
          <Header name={user.name} />
          <div className="add-todo-button" onClick={() => setPopupActive(true)}>
            +
          </div>
        </>
      )}

      <div className="todos ">
        {todos.map((todo) => (
          <Todo todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} key={todo._id} />
        ))}
      </div>

      

      <div className={`add-todo ${popupActive ? "" : "hidden"}`}>
        <input type="text" value={newtodo} onChange={(e) => setNewtodo(e.target.value)} placeholder='Enter a task' />
        <button onClick={() => { createTodo(newtodo); setNewtodo(''); setPopupActive(false) }}>Add</button>
      </div> */}
      
      <RouterProvider router={router} />

    </div>
  )
}

export default App
