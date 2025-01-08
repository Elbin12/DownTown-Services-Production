import React from 'react'
import ac from '../../../images/services_logos/ac.png'

function Service({img, title}) {
  return (
    <div className='flex w-1/3 items-center gap-6 border border-black rounded-lg p-4'>
      <img src={img} alt="" />
      <h4 className='text-lg font-medium text-[#454545]'>{title}</h4>
    </div>
  )
}

export default Service
