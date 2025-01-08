import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Userslist from '../../Components/Admin/Userslist'
import Navbar from '../../Components/Admin/Navbar'

function UserlistPage() {
  return (
    <>
        <Navbar/>
        <Sidebar />
        <Userslist role={'users'}/>
    </>
  )
}

export default UserlistPage
