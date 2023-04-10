import { useState, useEffect } from 'react'
import './App.css'

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
  }, [todos, loggedIn])



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
      } else {
        console.log('error')
      }
    })
    .catch((err) => console.error('error: ' + err))
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

  const deleteTodo = async (id) => {
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
        todo.completed = data.completed
      }
      return todo
    })))


    // setTodos(todos => todos.map(todo => {
    //   if (todo._id === id) {
    //     todo.completed = data.completed
    //   }
    //   return todo
    // }))
  }


  return (
    <div className="App">
      {!loggedIn ? (
        <div className="login">
          <h1>Log In</h1>
          <div className='login-form'>
              <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <button onClick={() => login()}>Log In</button>
          </div>
        </div>
      ) : (
        <div className='header'>
          <h1>Hello {user.name}</h1>
          <h2>To-Do List</h2>
        </div>
      )}

      <div className="todos ">
        {todos.map((todo) => (
          <div className={`todo ${todo.completed ? 'is-completed' : ''}`
          } key={todo._id} onClick={() => completeTodo(todo._id)}>
            <div className="todo-checkbox"></div>
            <div className="todo-text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
          </div>
        ))}
      </div>

      {loggedIn ? (
        <div className="add-todo-button" onClick={() => setPopupActive(true)}>
          +
        </div>
      ) : <div></div>}

      <div className={`add-todo ${popupActive ? "" : "hidden"}`}>
        <input type="text" value={newtodo} onChange={(e) => setNewtodo(e.target.value)} placeholder='Enter a task' />
        <button onClick={() => { createTodo(newtodo); setNewtodo(''); setPopupActive(false) }}>Add</button>
      </div>

    </div>
  )
}

export default App
