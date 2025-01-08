import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AdminProtectedRoute = ({children}) => {

  const userinfo = useSelector((state) => state.user.userinfo);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userinfo, 'userinfpooo');
    if (!userinfo.isAdmin) {
      navigate('/');
    }
  }, [userinfo.isAdmin, navigate]);

  return children;
};

export default AdminProtectedRoute;