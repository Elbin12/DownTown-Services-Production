import React from 'react'
import Service from './Service';
import ac from '../../../images/services_logos/ac.png';

function TopServices() {
  return (
    <div className='flex flex-col px-28 py-9 gap-10'>
      <h1 className='text-2xl font-semibold text-[#454545]'>Top Services</h1>
      <div className='flex flex-wrap gap-6'>
        <Service img={ac} title='Air conditioner service'/>
        <Service img={ac} title='Air conditioner service'/>
        <Service img={ac} title='Air conditioner service'/>
      </div>
    </div>
  )
}

export default TopServices
