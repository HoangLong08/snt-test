import { IconSuccess } from 'assets'
import Button from 'components/Button/index'
import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <div className='wrapper-success'>
      <Button icon={<IconSuccess />} onlyIcon />
      <p>Thank you, your consent has been successfully saved!</p>

      <Link to='/consents'>View all consents</Link>
    </div>
  )
}

export default Success
