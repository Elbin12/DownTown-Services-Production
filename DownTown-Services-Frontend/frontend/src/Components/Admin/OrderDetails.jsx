import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api } from '../../axios';

function OrderDetails() {
    const {id} = useParams()

    const [order, setOrder] = useState();

    useEffect(()=>{
        const fetchService = async()=>{
            try{
                const res = await api.get(`admin/order/${id}/`)
                console.log(res.data, 'data');
                if(res.status === 200){
                    setOrder(res.data)
                }
            }catch(err){
                console.log(err, 'err')
            }
        }
        fetchService();
    },[])

  return (
    <div className='h-screen flex justify-end py-9 pt-28 pr-10 bg-gray-100'>
      <div className="w-4/5 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Service details</h1>
        <div className="flex items-center space-x-6">
          <img src={order?.service_image} alt="Service" className="w-1/4 h-1/2 object-cover rounded"/>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{order?.service_name}</h2>
            <p className="text-gray-500">{order?.service_description}</p>
            {/* <p className="mt-1 text-sm text-gray-400">ORDER ID: <span className="font-medium text-black">1441687</span></p> */}
          </div>
          <div className='flex gap-4'>
            <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-md">
              {order?.status}
            </div>
            {/* <p className="mt-2 text-gray-500 text-sm">20 October 2024</p> */}
            <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-md ">
              {order?.payment_details?.status}
            </div>
          </div>
          <div className='text-center'>
            <p className="text-sm text-gray-400">Serviced By</p>
            <p className="text-xs text-stone-800 font-semibold">{order?.worker?.first_name}</p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between">
            <p className="text-gray-500">Base Price</p>
            <p className="text-black">Rs {order?.service_price}</p>
          </div>
          {order?.payment_details.additional_charges.map((charges, index)=>(
            <div className="flex justify-between">
              <p className="text-gray-500">Replacement Charge</p>
              <p className="text-black">Rs 150.00</p>
            </div>
          ))}
          <div className="border-t border-gray-200 my-4"></div>
          {order?.payment_details?.status === 'paid'&&
            <div className="flex justify-between font-semibold">
            <p className='text-stone-500'>AMOUNT PAID</p>
            <p className="text-lg text-green-600">Rs {order?.payment_details?.total_amount}</p>
          </div>}
        </div>
        <div className='flex justify-around w-3/5'>
          <div className='border-r border-stone-300 pr-11'>
            <h1 className="text-xl font-semibold mb-4">User Details</h1>
            <div className='px-3 flex gap-6 items-center'>
              <div>
                <img src={order?.user?.profile_pic} alt="" className='w-11 h-11 rounded-full'/>
                <h1 className='font-semibold text-stone-800'>{order?.user?.first_name}</h1>
              </div>
              <div>
                <label className='font-semibold'>User given description</label>
                <h1 className='px-3'>{order?.user_description}</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-4">Service Provider Details</h1>
            <div className='px-3 flex gap-6 items-center'>
              <div>
                <img src={order?.worker?.profile_pic} alt="" className='w-11 h-11 rounded-full'/>
                <h1 className='font-semibold text-stone-800'>{order?.worker?.first_name}</h1>
              </div>
              <div>
                <label className='font-semibold text-sm text-stone-600'>PHONE</label>
                <h1 className='font-semibold  text-stone-800'>{order?.worker?.mob}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='bg-white w-4/5 px-10 py-8 h-full rounded-lg shadow-lg'>
        <div className='flex justify-between items-center border-b pb-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>Order Details</h1>
          <button className='border border-red-500 text-red-500 px-4 py-1 rounded font-semibold hover:bg-red-500 hover:text-white transition duration-200'> Service</button>
        </div>
        
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <img src={order?.service_pic} alt={order?.service_name} className='w-full h-80 object-cover rounded-md shadow-md' />
            <h1 className='text-gray-600 font-semibold text-lg'>{order?.service_name}</h1>
            <div className='flex gap-4'>
              <p className='text-gray-500 font-semibold text-sm bg-slate-300 rounded-full px-4 py-1'>{order?.category_name}</p>
              <p className='text-gray-500 font-semibold text-sm bg-slate-300 rounded-full px-4 py-1'>{order?.subcategory_name}</p>
            </div>
          </div>
          <div className='space-y-6'>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>Description</h2>
              <p className='text-gray-600'>{order?.description}</p>
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>Price</h2>
              <p className='text-gray-600 font-bold'>Rs. {order?.price}</p>
            </div>

            <div className='border-t pt-4 mt-4'>
              <h2 className='text-lg font-semibold text-gray-800'>order Provider Details</h2>
              <div className='flex items-center space-x-4 mt-3'>
                <img src={order?.workerProfile.profile_pic} alt={order?.workerProfile.first_name} className='w-16 h-16 rounded-full object-cover' />
                <div>
                  <h3 className='text-gray-800 font-semibold text-lg'>{order?.workerProfile.first_name} {order?.workerProfile.last_name}</h3>
                  <p className='text-gray-600'>Email: {order?.workerProfile.email}</p>
                  <p className='text-gray-600'>Phone: {order?.workerProfile.mob}</p>
                  <p className='text-gray-600'>Location: {order?.workerProfile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default OrderDetails
