import React from 'react'
import Profile from '../../Components/User/Profile/Profile'
import Navbar from '../../Components/User/Navbar/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Footer from '../../Components/User/Footer'

function Profilepage() {
  return (
    <>
      <SecondNavbar role="user"/>  
      <Profile role="user" />  
    </>
  )
}

export default Profilepage
