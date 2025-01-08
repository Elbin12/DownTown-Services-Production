import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Userslist from '../../Components/Admin/Userslist'
import Navbar from '../../Components/Admin/Navbar'

function WorkerlistPage() {
  return (
    <>
        <Navbar/>
        <Sidebar />
        <Userslist role={'workers'}/>
    </>
  )
}

export default WorkerlistPage
