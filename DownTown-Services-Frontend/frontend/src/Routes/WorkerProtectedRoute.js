import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function WorkerProtectedRoute({children}) {

    const workerinfo = useSelector(state=>state.worker.workerinfo)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!workerinfo?.isWorker){
            navigate('/')
        }
    })

  return children
}

export default WorkerProtectedRoute
