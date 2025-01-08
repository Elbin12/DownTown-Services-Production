import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { api } from '../../axios';

function EditEmail({input, setInput, setActivePopup, email, setEmail, role}) {

  const [emailError, setEmailError] = useState();

  const userinfo = useSelector(state=>state.user.userinfo)
  const workerinfo = useSelector(state=>state.worker.workerinfo)

  console.log(userinfo?.email, 'email');
  
  
  const handleClick =async()=>{
    if(email === input){
      setEmailError('Please edit your email')
      return
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!input.match(validRegex)){
    setEmailError('Please give valid email.')
    return; 
    }

    try{
        const res = await api.post('sent-otp/', {'email':input})
        if (res.status === 200){
          setActivePopup('otp')
        }
      }catch(err){
        setEmailError(err.response.data.message)
        console.log(err,'data', err);
      }
  }
        

    

  return (
    <div className='w-full  z-10 fixed bg-[#39393999] h-full top-0 left-0 items-center flex justify-center'>
        <div className='bg-white w-1/4 h-3/5 p-6 flex flex-col justify-between rounded-lg'>
            <IoChevronBack onClick={()=>{setActivePopup(''); setEmail(role === 'user' ? userinfo?.email : workerinfo?.email); setInput((role === 'user' ? userinfo?.email : workerinfo?.email));}} className='text-lg cursor-pointer'/>
            <div className='flex flex-col gap-9'>
                <h1 className='text-lg'>Edit your Email Address</h1>
                <div>
                  <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="tel" className='border outline-none w-full py-4 rounded-lg px-2' placeholder='Enter Your Email Address'/>
                  <p className='text-red-600 text-xs px-2'>{emailError}</p>
                </div>
            </div>
            <div className='border bg-[#F1C72C] py-1 flex justify-center rounded-lg cursor-pointer' onClick={handleClick}>
                <h3 className='text-white font-bold tracking-wide text-lg'>Sent OTP</h3>
            </div>
      </div>
    </div>
  )
}

export default EditEmail
