import React from 'react'
import Header from 'components/Header'
import './style.css'

function LayoutClient({ children }) {
  return (
    <>
      <Header />
      <div className='container'>{children}</div>
    </>
  )
}

export default LayoutClient
