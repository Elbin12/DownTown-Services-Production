import React, { useState } from 'react'
import './Searchbar.css'
import { IoSearchOutline } from "react-icons/io5";  
import { useDispatch, useSelector } from 'react-redux';
import { setSearch_key } from '../../redux/user';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  
  const search_key = useSelector(state=>state.user.search_key)
  const [search, setSearch] = useState(search_key?search_key:'');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress =(e)=>{
    if (e.key === 'Enter') {
      dispatch(setSearch_key(e.target.value))
      navigate('/services/')
    }
  }

  return (
    <div className='w-1/2'>
      <div className='flex h-8 sm:h-11 lg:h-14'>
        <div className="search_icon flex justify-center items-center border-r-0 border-2 w-12 rounded-s-md sm:rounded-s-lg border-[#BBBBBB]">
          <IoSearchOutline /> 
        </div>
        <input placeholder='Search for Electrician, Plumber, Painter etc.' className='text-[7px] sm:text-xs lg:text-lg search_input pl-2 md:pl-6 border-2 border-[#BBBBBB] w-full rounded-r-md sm:rounded-r-lg focus:outline-none focus:border-[#3E6990] focus:ring-0 ' value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={handleKeyPress}/>
      </div>
    </div>
  )
}

export default Searchbar
