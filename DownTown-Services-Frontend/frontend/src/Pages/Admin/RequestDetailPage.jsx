import React from 'react'
import RequestDetails from '../../Components/Admin/RequestDetails'
import Sidebar from '../../Components/Admin/Sidebar'
import Navbar from '../../Components/Admin/Navbar'

function RequestDetailPage() {
  return (
    <>
        <Navbar />
        <Sidebar />
        <RequestDetails />
    </>
  )
}

export default RequestDetailPage
