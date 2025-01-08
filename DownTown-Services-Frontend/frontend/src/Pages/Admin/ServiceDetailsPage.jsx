import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import ServiceDetails from '../../Components/Admin/ServiceDetails'

function ServiceDetailsPage() {
  return (
    <>
        <Navbar />
        <Sidebar /> 
        <ServiceDetails />
    </>
  )
}

export default ServiceDetailsPage
