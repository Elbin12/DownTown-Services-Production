import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Dashboard from '../../Components/Worker/Dashboard'
import Chat from '../../Components/Chat/Chat'
import ChatDetails from '../../Components/Chat/ChatDetails'
import { api } from '../../axios'

function HomePage() {
  return (
    <>
        < Dashboard />
    </>
  )
}

export default HomePage
