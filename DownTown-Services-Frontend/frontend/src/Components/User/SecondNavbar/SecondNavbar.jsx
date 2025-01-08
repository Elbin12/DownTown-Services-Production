import React from 'react'
import { useNavigate } from 'react-router-dom'

function SecondNavbar({role}) {
  const navigate = useNavigate();
  return (
    <div className='bg-[#ede9dc] z-10  justify-center mt-24 gap-2  sm:gap-9 fixed w-full flex flex-row text-[#4F4E4E] text-xs sm:text-sm font-normal'>
        <h6 className={`p-2 sm:p-3 cursor-pointer ${window.location.pathname.includes('profile')&&'bg-[#dcce9b65] font-semibold'}`} onClick={()=>{role==='user'?navigate('/profile/'):navigate('/worker/profile/')}}>Profile</h6>
        <h6 className={`p-2 sm:p-3 cursor-pointer ${window.location.pathname.includes(role==='user'?'/orders/':'services/accepted/')&&'bg-[#dcce9b65] font-semibold'}`} onClick={()=>{role==='user'?navigate('/orders/'):navigate('/worker/services/accepted/')}}>Your Orders</h6>
        <h6 className={`p-2 sm:p-3 cursor-pointer ${window.location.pathname.includes('wallet')&&'bg-[#dcce9b65] font-semibold'}`} onClick={()=>{role==='user'?navigate('/wallet/'):navigate('/worker/wallet/')}}>Wallet</h6>
        <h6 className={`p-2 sm:p-3 cursor-pointer ${window.location.pathname.includes('chat')&&'bg-[#dcce9b65] font-semibold'}`}>Chat</h6>
    </div>
  )
}

export default SecondNavbar
