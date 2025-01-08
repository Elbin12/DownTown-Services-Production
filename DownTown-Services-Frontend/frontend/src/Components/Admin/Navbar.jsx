import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/LOGO.png';
import { FaCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";



function Navbar() {

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState();

  return (
    <div className='flex fixed z-10 justify-between w-full flex-column bg-white h-24 items-center px-10'>
        <div className="logo cursor-pointer" onClick={()=>{navigate('/')}}>
          <img src={Logo} alt="" />
        </div>
        <div className='' onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
        <FaCircleUser className='text-4xl opacity-80 cursor-pointer' />
        {showPopup&& 
            <div className=' fixed pt-2 right-10 flex z-10 justify-center items-center rounded-sm cursor-pointer'> 
              <div className='border bg-blue-50 '>
                <div className='flex items-center gap-3 px-4 py-2 hover:bg-orange-300'>
                  <IoIosLogOut className='text-2xl'/>
                  <h4 className='text-sm'>Logout</h4>
                </div>
              </div>
            </div>
        }
        </div>
    </div>
  )
}

export default Navbar
