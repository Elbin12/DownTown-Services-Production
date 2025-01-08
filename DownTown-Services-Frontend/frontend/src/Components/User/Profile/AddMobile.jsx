import React from 'react'
import { IoAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function AddMobile({setActivePopup}) {
  const navigate = useNavigate();
  return (
    <div className='flex items-center gap-3 text-lg text-[#434343] bg-[#f5f0cc] p-3 w-[445px] cursor-pointer rounded-md' onClick={()=>{setActivePopup('mobAdd')}}>
      <IoAdd className='text-2xl'/>
      <h3>Add Mobile Number</h3>
    </div>
  )
}

export default AddMobile
