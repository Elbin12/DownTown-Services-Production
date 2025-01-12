import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import Dashboard from '../../Components/Admin/Dashboard'

function HomePage() {
  return (
    <>
        <Navbar />
        <Sidebar />
        <Dashboard />
    </>
  )
}

export default HomePage
