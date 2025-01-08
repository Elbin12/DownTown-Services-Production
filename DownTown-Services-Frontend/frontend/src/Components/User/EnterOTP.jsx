import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { api } from '../../axios';

function EnterOTP({setPopup, mob}) {

    const navigate = useNavigate();
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, []);

    const handleOTP = (value, index)=>{  
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP)
        if (value && index < otp.length - 1 &&inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
          inputRefs.current[index - 1].focus();
        }
      };
 
  return (
    <div className='bg-white w-1/4 h-3/5 p-6 flex flex-col justify-between rounded-lg'>
        <IoChevronBack onClick={()=>{setPopup('')}} className='text-lg cursor-pointer'/>
        <div className='flex flex-col gap-9 pb-9'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-lg'>Enter OTP</h1>
                <p>An OTP is sent to {mob}</p>
            </div>
            <div className='flex justify-between py-6 w-full'>
                {otp.map((item, index)=>{
                    return(<input type="text" className='border outline-none w-[2.5rem] py-2 rounded-lg px-2' 
                        key={index} value={item} ref={(e) => inputRefs.current[index] = e} 
                        maxLength={1}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onChange={(e)=>{handleOTP(e.target.value, index)}}/>)
                })}
            </div>
        </div>
        <div className='border bg-[#F1C72C] py-1 flex justify-center rounded-lg cursor-pointer'>
            <h3 className='text-white font-bold tracking-wide text-lg' onClick={()=>{setPopup('')}}>CONTINUE</h3>
        </div>
    </div>
  )
}

export default EnterOTP
