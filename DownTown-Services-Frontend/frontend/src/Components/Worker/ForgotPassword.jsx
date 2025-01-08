import React from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen bg-lime-50 flex justify-center items-center'>
      <div className='bg-white w-1/4 py-9 px-12 flex flex-col gap-12 rounded-lg shadow-lg'>
        <p className='text-yellow-400 font-bold cursor-pointer hover:underline text-xs' onClick={()=>{navigate('/worker/')}}>BACK</p>
        <div className='text-center flex flex-col gap-5'>
            <h1 className='font-semibold text-lg'>Forgot password</h1>
            <input type="text" placeholder='Enter your Email' className='outline-none border w-full py-2 px-2 focus:border-gray-500 rounded-lg'/>
        </div>
        <div className='bg-[#3C5267] rounded-lg text-center py-2 cursor-pointer'>
            <h2 className='text-white font-bold'>CONTINUE</h2>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
