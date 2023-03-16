import React from 'react'
import './style.css'

function Button({ title, icon, onlyIcon, onClick }) {
  return (
    <button
      className={`btn${icon ? ' btn-icon' : ''} ${
        onlyIcon ? ' btn-only-icon' : ''
      }`}
      onClick={onClick}
    >
      {title} {icon && <span>{icon}</span>}
    </button>
  )
}

export default Button
