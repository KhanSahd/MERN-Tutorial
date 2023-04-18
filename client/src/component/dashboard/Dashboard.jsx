import React, {useEffect, useState} from 'react'
import './Dashboard.css'

const Dashboard = () => {

  const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://mytodos-sahd.herokuapp.com/api/goals/"
    : "http://localhost:8000/api/goals";

  const user = JSON.parse(localStorage.getItem('user'));

  const [todos, setTodos] = useState([])

  
  useEffect(() => {
    getTodos()
  }, [])
  
  
  const getTodos = async () => {
    await fetch(API_URL, {
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
    await fetch(API_URL + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
    setTodos(todos.filter((todo) => todo._id !== id));
  }

  const createTodo = async (text) => {
    await fetch(API_URL, {
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
    await fetch(API_URL + id, {
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


  return (
    <div className='dashboard'>
        <div className="header">
          <h1>Hello {user.name}</h1>
          <p>Todo List</p>
        </div>
        <div className="todos">
          {todos.map((todo) => (
          <div className={`todo ${todo.completed ? 'is-completed' : ''}`} 
            onClick={() => completeTodo(todo._id)} key={todo._id}>
            <div className="todo-checkbox"></div>
            <div className="todo-text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
          </div>
          ))}
        </div>
        <div className="create-todo">
          <input type="text" placeholder="Create a new todo..." onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createTodo(e.target.value)
              e.target.value = ''
            }
          }}/>
        </div>
    </div>
  )
}

export default Dashboard