import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from '../../features/auth/authSlice';

const Navbar = ({loggedIn}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset())
        navigate('/');
    }

  return (
    <div className='navbar'>
        <Link to={`${user ? '/dashboard' : '/'}`} style={{textDecoration: 'none', color: 'black'}}>
            <p className='logo'>MyTodos</p>
        </Link>
        <div className="buttons">
            {!user ? (
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
                <div className='icon' onClick={onLogout}>
                    Log Out
                </div>
            )
            }
        </div>
    </div>
  )
}

export default Navbar