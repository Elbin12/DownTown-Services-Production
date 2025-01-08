import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerinfo } from '../../redux/worker';
import { api } from '../../axios';

import { Toaster, toast } from 'sonner'

function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const workerinfo = useSelector((state) => state.worker.workerinfo);

    const handlesubmit = async()=>{
        var data = {email, password}
        try{
            const res = await api.post('worker/login/', data)
            console.log(res, 'res')
            dispatch(setWorkerinfo(res.data))
            navigate('/worker/dashboard/')
            toast.success('Loggined successfully')
        }
        catch(err){
            console.log(err);
            setError(err.response.data.message)
        }
    }

  return (
    <div className='w-full h-screen bg-lime-50 flex justify-center items-center'>
      <div className='w-5/12  bg-white px-16 py-9 rounded-lg flex flex-col gap-20 shadow-lg'>
        <div className='flex gap-1 items-center '>
            <h2 className='text-2xl text-[#504f4f] font-semibold'>Sign In</h2>
            <h4 className='text-xs pt-2.5 text-[#9A9A9A]'>As Worker</h4>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
                <h4 className='text-sm'>Email</h4>
                <input className='border rounded-lg w-3/4 h-10 focus:outline-none px-4' type="text" onChange={(e)=>{setEmail(e.target.value); setError('')}}/>
            </div>
            <div className='flex flex-col gap-1'>
                <h4 className='text-sm'>Password</h4>
                <input className='border rounded-lg w-3/4 h-10 focus:outline-none px-4' type="password" onChange={(e)=>{setPassword(e.target.value); setError('');}}/>
            </div>
            <div className='flex justify-end w-3/4'>
                <p className='text-xs hover:underline cursor-pointer hover:text-gray-600' onClick={()=>{navigate('/worker/forgot-password/')}}>Forgotten your password?</p>
            </div>
            <p className='text-red-500 text-sm'>{error}</p>
            <div className='text-center w-3/4'>
                <div className='bg-[#3C5267] rounded-full h-10 flex justify-center items-center cursor-pointer' onClick={handlesubmit}>
                    <h4 className='text-white'>Sign In</h4>
                </div>
                <p className='text-xs font-semibold mt-1 cursor-pointer hover:underline hover:text-gray-600' onClick={()=>{navigate('/worker/signup/')}}>Sign up if you don't have an worker account</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
