import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Toaster, toast } from 'sonner';

function OTP({input, setShowOTPPopup, setIsPasswordStep}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const [otpErr, setOTPErr] = useState();
    const inputRefs = useRef([]);

    const [timeRemaining, setTimeRemaining] = useState(30);
    

    useEffect(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, []);

    useEffect(()=>{
        const timeInterval = setInterval(()=>{         
            setTimeRemaining((prevTime)=>{  
                if (prevTime === 0){
                    return 0
                }else{
                    return prevTime - 1;    
                }
            });
        }, 1000);
        return ()=> clearInterval(timeInterval);
    }, [timeRemaining]);

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

    const handlesubmit = async ()=>{
        console.log(otp);

        const OTP = otp.join('');
        
        if (OTP === '' || OTP.length !== 6){
            setOTPErr('Please enter OTP')
            return
        }
        const data = {
            'otp':OTP
        }
        console.log(data, 'ggg');
        try{
            const res = await api.post('worker/verify-otp/', data);
            console.log(res);
            setIsPasswordStep(true);
            setShowOTPPopup(false);
        }
        catch(error){
            console.log('err',error);
            toast.error(error.response.data.message);
        }
        
    }

    const resendOTP = async()=>{
        console.log('hikdkd');
        
        try{
            const res = await api.post('worker/sent-otp/', {'email':input}) 
            if (res.status === 200){
                setTimeRemaining(30)
                toast.success('An OTP is sent to your email')       
            }   
        }catch(err){
            console.log(err, 'err');
            toast.error(err.response.data.message)
        }
    }



  return (
    <div className='min-h-screen items-center fixed bg-lime-50 w-full flex  justify-center p-4 top-0 z-20'>
      <div className='bg-white w-3/12 px-6 py-10 flex flex-col gap-9 rounded-lg drop-shadow-sm'>
        <div className='flex flex-col gap-1'>
            <h6 className='text-xs font-medium text-[#F1C72C] mb-4 hover:underline cursor-pointer' onClick={()=>{setShowOTPPopup(false)}}>BACK</h6>
            <h1 className='font-medium text-[#414141] text-xl'>Enter OTP</h1>
            <h6 className='text-sm'>OTP has been sent to {input}</h6>
        </div>
        <div className='flex flex-col gap-6'>
            <h4>Enter OTP</h4>
            <div className='flex flex-col'>
                <div className='flex justify-between py- w-full'>
                    {otp.map((item, index)=>{
                        return(<input type="text" className='border outline-none w-[2.5rem] py-2 rounded-lg px-2' 
                            key={index} value={item} ref={(e) => inputRefs.current[index] = e} 
                            maxLength={1}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onChange={(e)=>{handleOTP(e.target.value, index); setOTPErr('')}}/>)
                    })}
                </div>  
                <p className='text-xs text-red-500'>{otpErr}</p>
            </div>
            <h6 className='text-sm'>Didn't receive the OTP?
                <span className={`hover:text-[#F1C72C] font-medium mb-4 ${timeRemaining > 0 ? 'text-gray-400' : 'hover:underline cursor-pointer'}`} onClick={timeRemaining > 0 ? null : resendOTP}>
                    {timeRemaining > 0 ? `Resend in ${timeRemaining} Sec` : ' Resend OTP'}
                </span> 
            </h6>
        </div>
        <div onClick={handlesubmit} className='border bg-[#F1C72C] p-3 flex justify-center rounded-full mb-3 cursor-pointer'>
            <h3 className='text-white font-bold tracking-wide text-sm'>VERIFY</h3>
        </div>
      </div>
    </div>
  )
}

export default OTP
