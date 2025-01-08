import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Wallet from '../../Components/User/Wallet'
import Footer from '../../Components/User/Footer'

function WalletPage() {
  return (
    <>
      <SecondNavbar role="worker"/>  
      <Wallet role="worker" />  
    </>
  )
}

export default WalletPage
