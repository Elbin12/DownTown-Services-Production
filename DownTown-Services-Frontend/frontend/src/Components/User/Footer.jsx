import React from 'react';
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io5";

function Footer() {
  return (
    <div className='bg-[#c6d2b181] '>
      <div className='flex flex-col gap-3 px-24 py-11'>
        <div className='flex flex-col gap-1'>
            <h1 className='text-sm font-semibold'>SERVICE OFFERING</h1>
            <p className='text-xs'>Home Wiring, Lighting Installation, Appliance Circuits, Electrical Inspections, Leak Repairs, Pipe Installation, Drain Cleaning, Water Heater Repairs, Home Cleaning, Carpet Cleaning, Window Cleaning, Post-Construction Cleaning, Interior Painting, Exterior Painting, Wall Textures, Paint Touch-ups, Appliance Repairs, Door Repairs, Cabinet Installation, Shelving</p>
        </div>
        <div className='flex flex-col gap-1'>
            <h1 className='text-sm font-semibold'>QUICK LINKS</h1>
            <p className='text-xs'>Service Discount Coupons, Book an Electrician, Book a Plumber, Book a Cleaner, Book a Painter, Special Offers</p>
        </div>
        <div className='flex flex-col gap-1'>
            <h1 className='text-sm font-semibold'>POPULAR SERVICES</h1>
            <div className='flex flex-wrap text-xs gap-2'>
                <p>Electrical Repairs: Fast and reliable electrical repair services.</p>
                <p>Electrical Repairs: Fast and reliable electrical repair services.</p>
                <p>Electrical Repairs: Fast and reliable electrical repair services.</p>
                <p>Electrical Repairs: Fast and reliable electrical repair services.</p>
                <p>Electrical Repairs: Fast and reliable electrical repair services.</p>
            </div>
        </div>
      </div>
      <div className='bg-[#282828] flex justify-between items-center px-24 py-9'>
        <div className=' text-3xl flex gap-2 text-white'>
          <IoLogoFacebook/>
          <AiFillTwitterCircle />
        </div>
        <div>
          <h1 className='text-xs text-white'>© 2024 DOWNTOWN SERVICES PVT. LTD. <br />
          Country India USA UAE</h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
