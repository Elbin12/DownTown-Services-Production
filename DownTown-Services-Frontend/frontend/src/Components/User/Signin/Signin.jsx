import React, { useRef, useState } from 'react'
import './Signin.css'
import img from '../../../images/Mask group.png'
import { FcGoogle } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";
import { useGoogleLogin } from '@react-oauth/google';

import {api} from '../../../axios'
import { json, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserinfo } from '../../../redux/user';

import { Toaster, toast } from 'sonner'

function Signin({setActivePopup, input, setInput}) {

  const [Error, setError] = useState();
  const inputElement = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = ()=>{
    var mob = ''
    var email = ''
    if (Number.isInteger(parseInt(input))){
      if (input.length !== 10){
        setError('Mobile number should contain 10 digits.')
        return;
      }
      var mob = input
    }
    else{
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!input.match(validRegex)){
        setError('Please give valid email.')
        return; 
      }
      var email = input
    }
    var data = {
      'email' : email,
      'mob' : mob,
    }
    console.log("data-->"+JSON.stringify(data));
    console.log(email, mob);

    try{
      api.post('signin/', data).then((res)=>{
        setActivePopup('otp')
        console.log(res.data,'data', res);
      })
    }catch(err){
      console.log(err, 'err');
    }
    
  }

    const login = useGoogleLogin({
      onSuccess: async  tokenResponse => {
        console.log(tokenResponse)
        try{
          const res = await api.post('signin-with-google/', { token: tokenResponse.access_token })
          console.log(res.status, 'status');
          
          if (res.status === 200){
            console.log(res.data, '200'); 
            setActivePopup('')
            console.log('hi', res.data);
            dispatch(setUserinfo(res.data))
            toast.success("Sign In successfully");
          }
        }catch(err){
          console.error("Error signing in:", err);
          if(err.response.status === 400){
            console.log(err.response.data, '400');
            toast.error(err.response.data.message);
          }else{
            setActivePopup('')
            toast.error("An unexpected error occurred. Please try again.");
          }
        }
      }
      
    });

  return (
    <div className='fixed bg-[#39393999] w-full flex justify-center min-h-screen items-center p-5 top-0 z-20' onClick={()=>{setActivePopup('')}}>
      <div onClick={(e)=>e.stopPropagation()} className='signin p-5 bg-white flex rounded-xl '>
        <div className="left">
            <img src={img} alt="" />
        </div>
        <div className="right p-20 flex flex-col gap-10">
            <div>
                <div onClick={() => login()}  className='border gap-8 flex pl-4 pr-20 pt-2 pb-2 rounded-lg items-center m-2 cursor-pointer'>
                    <FcGoogle className='text-xl'/>
                    <h4 className='text-sm font-medium text-stone-950'>Continue with Google</h4>
                </div >
                <div className='flex items-center gap-2'>
                    <div className='line w-36 bg-gray-400'></div>
                    <h6 className='text-xs'>Or</h6>
                    <div className='line w-36 bg-gray-400'></div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-normal'>Email or Mobile Number</label>
                    <input type="text" onChange={(e)=>{setInput(e.target.value)} } className='border outline-none h-10 rounded-lg pl-3'/>
                    <p className='text-red-600 text-xs'>{Error}</p>
                </div>
                <button type='submit' className='h-10 rounded-full bg-[#F1C72C] text-white font-bold' onClick={handlesubmit}>CONTINUE</button>
            </div>
        </div>
      <div className='pl-3 '>
        <IoIosCloseCircle className=' text-3xl cursor-pointer' onClick={()=>{setActivePopup('')}}/>
      </div>
      </div>
    </div>
    
  )
}

export default Signin
