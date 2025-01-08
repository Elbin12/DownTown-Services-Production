import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';
import Footer from '../../Components/User/Footer';

import { Toaster, toast } from 'sonner'
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';
import { api } from '../../axios';
import { useSelector } from 'react-redux';


function Homepage() {
  return (
    <Fragment>
      <Banner />
      <TopServices />
    </Fragment>
  )
}

export default Homepage
