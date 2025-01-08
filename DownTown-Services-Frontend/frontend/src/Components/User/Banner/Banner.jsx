import React from 'react';
import banner_img from '../../../images/banner_img.jpg'

function Banner() {
  return (
    <div className='w-full h-[30rem] overflow-hidden mt-[5rem] bg-black'>
      <img src={banner_img} alt="" />
    </div>
  )
}

export default Banner
