import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

function Header() {
  return (
    <header className='wrapper-header container'>
      <div>
        <ul className='wrapper-header-menu'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? 'menu-item-link-active' : 'menu-item-link'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/consents'
              className={({ isActive }) =>
                isActive ? 'menu-item-link-active' : 'menu-item-link'
              }
            >
              Consents
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
