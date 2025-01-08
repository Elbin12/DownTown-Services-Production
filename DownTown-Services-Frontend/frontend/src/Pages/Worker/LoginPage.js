import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Login from '../../Components/Worker/Login'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const workerinfo = useSelector((state) => state.worker.workerinfo);
  const navigate = useNavigate();

  useEffect(() => {
      console.log('useeffect', workerinfo);
      if (workerinfo) {
          console.log(workerinfo.isAdmin, 'Admin access');
          navigate('/worker/dashboard/');
      }
  }, [workerinfo]);

  return (
    <>
    <Login />
    </>
  )
}

export default LoginPage
