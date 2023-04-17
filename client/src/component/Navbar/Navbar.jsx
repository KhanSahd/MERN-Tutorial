import React from 'react'
import './Navbar.css'
import Button from '../button/Button'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to="/dashboard" style={{textDecoration: 'none', color: 'black'}}>
            <p className='logo'>MyTodos</p>
        </Link>
        <div className="buttons">
            <Link className='icon' to="/login" style={{textDecoration: 'none', color: 'black'}}>
                {/* <Button text='Login' filled={false}/> */}
                <FaSignInAlt /> LogIn
            </Link>
            <Link className='icon' to="/register" style={{textDecoration: 'none', color: 'black'}}>
                {/* <Button text='Register' filled={true}/> */}
                <FaUserAlt /> Register
            </Link>
        </div>
    </div>
  )
}

export default Navbar