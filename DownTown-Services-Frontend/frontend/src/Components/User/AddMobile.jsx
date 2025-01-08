import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";

function MobilePopup({role, setActivePopup, mob, setMob}) {

  const [input, setInput] = useState(mob);
  const [mobError, setMobError] = useState();


  console.log(mob, 'weg');
  
  const handleClick =()=>{
    Number.isInteger(parseInt(input))
    if (input.trim() === ''){
      setMobError('Mobile number is required')
      console.log('hhhh', input,input.length, mob);
      return
    }else if(input.length != 10){
      setMobError('Mobile number should contain 10 digits')
      return
    }
    setActivePopup('save');
    setMob(input);
    console.log(mob, 'lllllll');
    
  }
        

    

  return (
    <div className='w-full  z-10 fixed bg-[#39393999] h-full top-0 left-0 items-center flex justify-center'>
        <div className='bg-white w-1/4 h-3/5 p-6 flex flex-col justify-between rounded-lg'>
            <IoChevronBack onClick={()=>{setActivePopup('')}} className='text-lg cursor-pointer'/>
            <div className='flex flex-col gap-9'>
                <h1 className='text-lg'>{role} Your Mobile Number</h1>
                <div>
                  <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="tel" className='border outline-none w-full py-4 rounded-lg px-2' placeholder='Enter Your Mobile Number'/>
                  <p className='text-red-600 text-xs px-2'>{mobError}</p>
                </div>
            </div>
            <div className='border bg-[#F1C72C] py-1 flex justify-center rounded-lg cursor-pointer' onClick={handleClick}>
                <h3 className='text-white font-bold tracking-wide text-lg'>CONTINUE</h3>
            </div>
      </div>
    </div>
  )
}

export default MobilePopup
