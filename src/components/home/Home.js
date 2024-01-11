import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.authReducer)
  
  // checking user state
  useEffect(() => {
    if (!user || !localStorage.getItem('auth-token')) {
      navigate('/auth')
    }
  })

  return (
    <div className='pb-16'>
      <Outlet />
    </div>
  )
}

export default Home