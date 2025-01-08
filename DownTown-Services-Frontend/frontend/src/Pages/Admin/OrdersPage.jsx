import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import Orders from '../../Components/Admin/Orders'

function OrdersPage() {
  return (
    <>
        <Navbar />
        <Sidebar /> 
        <Orders />
    </>
  )
}

export default OrdersPage
