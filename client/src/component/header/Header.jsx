import React from 'react'
import './Header.css'

const Header = ({name}) => {
  return (
    <div className='header'>
        <h1>Hello {name}</h1>
        <h2>To-Do List</h2>
    </div>
  )
}

export default Header