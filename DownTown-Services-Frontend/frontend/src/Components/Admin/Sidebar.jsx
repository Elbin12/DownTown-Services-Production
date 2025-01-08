import React from 'react'
import Logo from '../../images/LOGO.png';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";
import { TiSpanner } from "react-icons/ti";
import { BiCategory } from "react-icons/bi";


function Sidebar() {
  return (
    <div className='w-1/6 h-screen fixed pt-24 flex-col justify-center bg-[#CEE7E6]'>
      {/* <div className='p-6'>
        <img src={Logo} alt="" />
      </div> */}
      <div className='flex flex-col gap-6 items-center mt-11'>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('dashboard')&&'bg-[#BACBDF]'}`}>
            <MdSpaceDashboard className={`${window.location.pathname.includes('dashboard')&& 'text-2xl font-semibold'}`}/>
            <li className='list-none '>
              <Link to="/admin/dashboard/" className={`${window.location.pathname.includes('dashboard')&& 'text-[#658ab7] font-semibold'}`}>Dashboard</Link>
            </li>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('user')&&'bg-[#BACBDF]'}`}>
            <PiUsersThree className={`${window.location.pathname.includes('user')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/users/" className={`${window.location.pathname.includes('user')&& 'text-[#658ab7] font-semibold'}`}>Users</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('worker')&&'bg-[#BACBDF]'}`}>
            <FaUsers className={`${window.location.pathname.includes('worker')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/workers/" className={`${window.location.pathname.includes('worker')&& 'text-[#658ab7] font-semibold'}`}>Workers</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('requests') || window.location.pathname.includes('request') &&'bg-[#BACBDF]'}`}>
            <FaUsers className={`${window.location.pathname.includes('requests')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/requests/" className={`${window.location.pathname.includes('requests')&& 'text-[#658ab7] font-semibold'}`}>Requests</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('services')&&'bg-[#BACBDF]'}`}>
            <TiSpanner className={`${window.location.pathname.includes('services')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/services/" className={`${window.location.pathname.includes('services')&& 'text-[#658ab7] font-semibold'}`}>Services</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('orders')&&'bg-[#BACBDF]'}`}>
            <TiSpanner className={`${window.location.pathname.includes('orders')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/orders/" className={`${window.location.pathname.includes('orders')&& 'text-[#658ab7] font-semibold'}`}>Orders</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('categories')&&'bg-[#BACBDF]'}`}>
            <BiCategory className={`${window.location.pathname.includes('categories')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/categories/" className={`${window.location.pathname.includes('categories')&& 'text-[#658ab7] font-semibold'}`}>Categories</Link>
        </div>
        <div className={`flex items-center gap-1 w-8/12 py-4 pl-4 justify-start ${window.location.pathname.includes('subscriptions')&&'bg-[#BACBDF]'}`}>
            <BiCategory className={`${window.location.pathname.includes('subscriptions')&& 'text-2xl font-semibold'}`}/>
            <Link to="/admin/subscriptions/" className={`${window.location.pathname.includes('categories')&& 'text-[#658ab7] font-semibold'}`}>Subscriptions</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
