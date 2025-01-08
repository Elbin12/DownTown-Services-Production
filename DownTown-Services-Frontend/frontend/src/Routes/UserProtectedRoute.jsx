import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserinfo } from '../redux/user';

function UserProtectedRoute({children}) {

    const userinfo = useSelector((state) => state.user.userinfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        
        if (userinfo === undefined || userinfo === '') {
            dispatch(setUserinfo(''))
            navigate('/'); 
        }
    }, [userinfo.isAdmin, navigate])
    
    
    return children;

}

export default UserProtectedRoute