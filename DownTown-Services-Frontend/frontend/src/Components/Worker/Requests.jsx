import React, { useEffect, useState } from 'react'
import wires from '../../images/services_images/wires.jpg'
import { api } from '../../axios'
import {toast} from 'sonner';
import { FaWindowClose } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";


function Requests() {

  const [requests, setRequest] = useState([]);

  useEffect(()=>{
    const fetchRequests = async()=>{
      try{
        const res = await api.get('worker/requests/')
        if (res.status === 200){
          console.log(res.data, 'data');
          setRequest(res.data)
        }
      }catch(err){
        console.log(err,'err', err.status);
      }
    }
    fetchRequests();
  }, [])

  const handleRequest = async(req, id)=>{
    try{
      const res = await api.post('worker/requests/', {'request':req, 'request_id':id })
      if (res.status === 200){
        console.log(res.data, 'res');
        setRequest(requests.filter((req)=>req.id!==id));
      }
    }catch(err){
      console.log(err, 'err');
    }
  }

  return (
    <div className='w-screen h-screen mt-24 flex justify-center'>
      <div className='bg-white w-full px-14 fixed py-5 h-screen'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-semibold'>Requests</h2>
          <div className='flex gap-4 px-2 flex-wrap'>
            {requests?.map((request)=>(
              <div className='bg-slate-200 relative justify-center w-1/5 h-52 shadow-md flex flex-col items-center transform transition-transform duration-200 hover:scale-105 hover:shadow-xl'>
                <div className='relative flex flex-col w-full h-full'>
                  <div className='bg-cover relative h-3/4 text-center'>
                    <div className='bg-zinc-300 absolute w-full h-full opacity-30'></div>
                    <img src={request.service.pic} alt="" className='h-full w-full'/>
                    <h2 className='text-sm font-semibold'>{request.service.service_name}</h2>
                    <h2 className='text-xs'>{request.description}</h2>
                  </div>
                </div>
                <div className='absolute text-center w-full flex bg-[#f3f3f373] py-2 flex-col justify-center'>
                  <h2 className='font-semibold'>{request.user.first_name} {request.user.last_name}</h2>
                  <div className='flex w-full px-4 justify-between '>
                    <div className='bg-orange-600 justify-center flex items-center rounded-full w-11 h-11 opacity-80  cursor-pointer' onClick={()=>{handleRequest('rejected', request.id )}} ><FaWindowClose className='text-sm'/></div>
                    <div className='bg-green-500 justify-center flex items-center rounded-full w-11 h-11 opacity-80 cursor-pointer' onClick={()=>{handleRequest('accepted', request.id)}}><TiTickOutline className='text-xl'/></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Requests
