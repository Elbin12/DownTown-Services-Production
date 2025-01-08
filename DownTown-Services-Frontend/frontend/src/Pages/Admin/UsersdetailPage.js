import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import UserDetails from '../../Components/Admin/UserDetails'
import Navbar from '../../Components/Admin/Navbar'

function UsersdetailPage() {
  return (
    <>
        <Navbar />
        <Sidebar />
        <UserDetails/>
    </>
  )
}

export default UsersdetailPage
