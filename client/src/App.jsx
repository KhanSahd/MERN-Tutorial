import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false);
  const [newtodo, setNewtodo] = useState('')

  useEffect(() => {
    getTodos();
  }, [todos])

  const getTodos = async () => {
    await fetch('http://localhost:8000/api/goals')
    .then((res) => res.json())
    .then((data) => setTodos(data))
    .catch((err) => console.error('error: ' + err))
    
  }

  const deleteTodo = async (id) => {
    await fetch('http://localhost:8000/api/goals/' + id, {
      method: 'DELETE',
    })
  }

  const createTodo = async (text) => {
    await fetch('http://localhost:8000/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
  }

  const completeTodo = async (id) => { 
    const data = await fetch('http://localhost:8000/api/goals/' + id, {
      method: 'PUT',

    })
  }


  return (
    <div className="App">
      <h1>Hello Sahd</h1>
      <h2>To-Do List</h2>

      <div className="todos ">
        {todos.map((todo) => (
          <div className={`todo ${todo.completed ? 'is-completed' : ''}`
          } key={todo._id}>
            <div className="todo-checkbox" onClick={() => completeTodo(todo._id)}></div>
            <div className="todo-text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
          </div>
        ))}
      </div>

      <div className="add-todo-button" onClick={() => setPopupActive(true)}>+</div>

      <div className={`add-todo ${popupActive ? "" : "hidden"}`}>
        <input type="text" value={newtodo} onChange={(e) => setNewtodo(e.target.value)} placeholder='Enter a task' />
        <button onClick={() => { createTodo(newtodo); setNewtodo(''); setPopupActive(false) }}>Add</button>
      </div>

    </div>
  )
}

export default App
