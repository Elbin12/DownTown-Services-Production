import React from 'react'
import { CiSearch } from "react-icons/ci";

function Searchbar() {
  return (
    <div className='border flex items-center gap-2 rounded-full px-2 py-1'>
      <CiSearch />
      <input className='outline-none' type="text" placeholder='Search..'/>
    </div>
  )
}

export default Searchbar
