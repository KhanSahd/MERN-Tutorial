import React from 'react'
import './Button.css'

const Button = ({text, filled, handleclick}) => {
  return (
    <div className={`button ${filled ? 'filled' : ''}`} onClick={handleclick}>
        <p>{text}</p>
    </div>
  )
}

export default Button