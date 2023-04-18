import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = ({loggedIn}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        localStorage.removeItem('user');
        navigate('/');
        dispatch(reset())
    }

  return (
    <div className='navbar'>
        <Link to={`${localStorage.getItem('user') ? '/dashboard' : '/'}`} style={{textDecoration: 'none', color: 'black'}}>
            <p className='logo'>MyTodos</p>
        </Link>
        <div className="buttons">
            {!localStorage.getItem('user') ? (
            <>
                <Link className='icon' to="/login" style={{textDecoration: 'none', color: 'black'}}>
                    {/* <Button text='Login' filled={false}/> */}
                    <FaSignInAlt /> LogIn
                </Link>
                <Link className='icon' to="/register" style={{textDecoration: 'none', color: 'black'}}>
                    {/* <Button text='Register' filled={true}/> */}
                    <FaUserAlt /> Register
                </Link>
            </>
            ) : (
                <div className='icon' onClick={logout}>
                    Log Out
                </div>
            )
            }
        </div>
    </div>
  )
}

export default Navbar