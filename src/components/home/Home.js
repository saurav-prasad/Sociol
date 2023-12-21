import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='pb-16 pt-8'>
        <Outlet/>
    </div>
  )
}

export default Home