import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './Root.css'

const Root = ({loggedIn}) => {
  return (
    <>
        <div>
            <Navbar />
        </div>
        <div className='outlet-container'>
            <Outlet />
        </div>
    </>
  )
}

export default Root