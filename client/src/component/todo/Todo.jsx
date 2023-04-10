import React from 'react'
import './todo.css'

const Todo = ({todo, completeTodo, deleteTodo}) => {
  return (
    <div className={`todo ${todo.completed ? 'is-completed' : ''}`} 
         onClick={() => completeTodo(todo._id)}>
        <div className="todo-checkbox"></div>
        <div className="todo-text">{todo.text}</div>
        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
    </div>
  )
}

export default Todo