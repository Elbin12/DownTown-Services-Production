import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Orders from '../../Components/User/Orders'

function OrdersPage() {
  return (
    <>
        <SecondNavbar role='worker'/>
        <Orders role='worker'/>
    </>
  )
}

export default OrdersPage
