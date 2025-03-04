import React from 'react';
import banner_img from '../../../images/banner_img.jpg'
import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Banner() {

  const navigate = useNavigate();
  
  return (
    <div className="relative w-full h-[30rem] mt-[5rem]  overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center" 
           style={{
             backgroundImage: 'url(https://images.pexels.com/photos/7484798/pexels-photo-7484798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Effortless Home Services, 
          <br className="hidden md:block" /> 
          Just a Click Away
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Professional, reliable, and convenient services tailored to your home's unique needs. 
          From cleaning to repairs, we've got you covered.
        </p>
        <div className="flex justify-center">
          <button className="group flex items-center gap-3 px-8 py-4 bg-primary hover:bg-[#2e5870] text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" onClick={()=>{navigate('/services/')}}>
            Get Started Now
            <ArrowRightIcon  className="transition-transform group-hover:translate-x-1" size={24}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
