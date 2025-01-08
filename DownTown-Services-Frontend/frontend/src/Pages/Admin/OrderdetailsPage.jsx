import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import OrderDetails from '../../Components/Admin/OrderDetails'

function OrderdetailsPage() {
  return (
    <>
        <Navbar />
        <Sidebar /> 
        <OrderDetails />
    </>
  )
}

export default OrderdetailsPage
