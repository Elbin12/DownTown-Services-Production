import React, { useState } from 'react'

function UserDetails({role, user, order}) {
    
    console.log(role, user, order, 'data');
  return (
    <div className='flex px-9'>
        <div className='flex py-6 gap-3 w-1/4 border-r items-start border-stone-400'>
            <div className='rounded-full w-16 h-16 overflow-hidden'>
                <img src={user?.profile_pic} alt="" className='w-full h-full object-cover'/>
            </div>
            <div>
                <h1>{user?.first_name}</h1>
                <h2>{user?.mob}</h2>
            </div>
        </div>
        <div className='pl-11 py-6 flex gap-16 w-3/4'>
            <div className='flex gap-4'>
                <div className='w-16 h-16 overflow-hidden'>
                    <img src={order?.service_image} alt="" className='w-full h-full object-cover'/>
                </div>
                <div>
                    <h1>{order?.service_name}</h1>
                    <p className='text-xs'>{order?.service_description}</p>
                </div>
            </div>
            <div className='w-1/3'>
                <h1 className='text-sm font-semibold text-stone-800 mb-2'>{role==='user'?'Description about your work':'Description that user given'}</h1>
                <p className='bg-amber-50 px-2 text-xs py-2 h-3/4 w-full'>{order?.user_description}</p>
            </div>
        </div>
    </div>
  )
}

export default UserDetails
