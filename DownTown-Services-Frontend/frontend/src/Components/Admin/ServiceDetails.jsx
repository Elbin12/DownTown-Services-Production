import React, { useEffect, useState } from 'react'
import { api } from '../../axios'
import { useParams } from 'react-router-dom'

function ServiceDetails() {
    const {id} = useParams()

    const [service, setService] = useState();

    useEffect(()=>{
        const fetchService = async()=>{
            try{
                const res = await api.get(`admin/service/${id}/`)
                console.log(res.data, 'data');
                if(res.status === 200){
                    setService(res.data)
                }
            }catch(err){
                console.log(err, 'err')
            }
        }
        fetchService();
    },[])

    const blockService =async()=>{
        try{
            const res = await api.post(`admin/service/${id}/`)
            if (res.status === 200){
                setService(res.data)
            }
        }catch(err){
            console.log(err, 'err');
        }
    }

  return (
    <div className='h-screen flex justify-end py-9 pt-28 pr-10 bg-gray-100'>
      <div className='bg-white w-4/5 px-10 py-8 h-full rounded-lg shadow-lg'>
        <div className='flex justify-between items-center border-b pb-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>Service Details</h1>
          <button className='border border-red-500 text-red-500 px-4 py-1 rounded font-semibold hover:bg-red-500 hover:text-white transition duration-200' onClick={blockService}>{service?.is_active?'Block':'Unblock'} Service</button>
        </div>
        
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <img src={service?.pic} alt={service?.service_name} className='w-full h-80 object-cover rounded-md shadow-md' />
            <h1 className='text-gray-600 font-semibold text-lg'>{service?.service_name}</h1>
            <div className='flex gap-4'>
              <p className='text-gray-500 font-semibold text-sm bg-slate-300 rounded-full px-4 py-1'>{service?.category_name}</p>
              <p className='text-gray-500 font-semibold text-sm bg-slate-300 rounded-full px-4 py-1'>{service?.subcategory_name}</p>
            </div>
          </div>
          <div className='space-y-6'>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>Description</h2>
              <p className='text-gray-600'>{service?.description}</p>
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>Price</h2>
              <p className='text-gray-600 font-bold'>Rs. {service?.price}</p>
            </div>

            <div className='border-t pt-4 mt-4'>
              <h2 className='text-lg font-semibold text-gray-800'>Service Provider Details</h2>
              <div className='flex items-center space-x-4 mt-3'>
                <img src={service?.workerProfile.profile_pic} alt={service?.workerProfile.first_name} className='w-16 h-16 rounded-full object-cover' />
                <div>
                  <h3 className='text-gray-800 font-semibold text-lg'>{service?.workerProfile.first_name} {service?.workerProfile.last_name}</h3>
                  <p className='text-gray-600'>Email: {service?.workerProfile.email}</p>
                  <p className='text-gray-600'>Phone: {service?.workerProfile.mob}</p>
                  <p className='text-gray-600'>Location: {service?.workerProfile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
