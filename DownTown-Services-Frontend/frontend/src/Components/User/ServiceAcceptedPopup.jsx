import React, { useEffect, useState } from 'react';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import {api} from '../../axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock } from 'lucide-react';


function ServiceAcceptedPopup({service, from}) {
    const [isClicked, setIsClicked] = useState(false);

    const [order, setOrder] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchOrder=async()=>{
            if (from === 'order'){
                setOrder(service)
            }else{
                const id = service?.request.id
                try{
                    const res = await api.get(`find-order/${id}/`)
                    setOrder(res.data)
                    console.log(res.data, 'resss');
                }catch(err){
                    console.log(err,'err')
                }
            }
        }
        fetchOrder();
    }, [])

    useEffect(()=>{
        if(order?.order_tracking.is_worker_arrived){
            navigate(`/order/${order?.id}/`);
        }
    })

    const handleClick =async()=>{
        try{
            const data = {
                'order_id':order.id,
            }
            const res = await api.post('worker-arrived/', data)
            console.log('hii', res.data, res.status);
            
            if (res.status === 200){
                console.log(res.data, 'data');
                setOrder((prev)=>({
                    ...prev, 
                    order_tracking: res.data
                }));
            }
        }catch(err){
            console.log(err, 'err')
        }
    }

    console.log(order, 'service');
    

  return (
    <div className='fixed w-full flex justify-center items-center h-screen z-20 bg-[#000000ad]'>
        <div className='bg-white relative rounded-lg overflow-hidden w-3/4 justify-center gap-8 flex flex-col h-3/4'>
            {isClicked&&
                <div className='absolute z-20 flex items-center justify-center w-full h-full bg-[#46484866]'>
                    <div className='bg-white rounded shadow-lg flex flex-col justify-center px-9 py-4 items-center'>
                        <p className='pb-2'>Are you sure the worker has arrived?</p>
                        <div>
                            <button className='border px-2 bg-green-300 text-neutral-800 rounded font-bold' onClick={handleClick}>Yes</button> or <button className='border px-2 text-neutral-800 font-bold rounded bg-red-300' onClick={()=>{setIsClicked(false);}}>No</button>
                        </div>
                    </div>
                </div>
            }
            <div className='flex h-1/3 gap-2 items-center w-full justify-center'>
                <div className='w-1/2 h-full overflow-hidden'>
                    <img src={order?.service_image} alt="" className=' w-full h-full object-cover'/>
                </div>
                <div className='h-full'>
                    <h1 className='text-primary text-2xl font-semibold'>{order?.service_name}</h1>
                    <p className='text-sm mb-2'>{order?.service_description}</p>
                    <div className='bg-primary inline-flex rounded-sm'>
                        <h1 className='text-white text-xl font-bold px-9 py-1'>{order?.service_price}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-9 items-center'>
                <div className='flex flex-col items-center'>
                    <div className='w-28 h-28 rounded-full overflow-hidden'>
                        <img src={order?.worker?.profile_pic} alt="" className='w-full h-full object-cover'/>
                    </div>
                    <h1 className='text-xl font-semibold text-stone-800'>{order?.worker?.first_name}</h1>
                    <IoChatbubbleEllipsesSharp />   
                </div>
                <div className='w-1/2 '>
                    <div className='w-full border h-full flex justify-between items-center py-3 px-3'>
                        <div>
                            <h1 className='mb-1 text-slate-500'>Description you gave:</h1>
                            <p className='text-sm px-5'>{order?.user_description}</p>
                        </div>
                        {/* <p className='bg-lime-50 px-3 py-1 font-semibold text-green-700'>Accepted</p> */}
                    </div>
                    
                    <div className="flex gap-2 mt-3 flex-col items-center">
                        <p className="text-gray-600 text-center">
                            Share this code with your service provider upon arrival
                        </p>
                        <div className="bg-gray-100 py-2 w-3/4 text-center">
                            <span className="text-4xl font-bold tracking-wider text-yellow-400">{order?.otp}</span>
                        </div>
                        {/* <button
                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                            isClicked
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        onClick={()=>{setIsClicked(true);}}
                        disabled={isClicked}
                        >
                        {isClicked ? (
                            <>
                            <CheckCircle className="h-6 w-6 mr-2" />
                            Worker Arrived
                            </>
                        ) : (
                            'Confirm Worker Arrival'
                        )}
                        </button> */}
                    </div>
                    
                </div>
            </div>
            <div className="text-center p-4 mb-2 bg-green-50">
                <p className="text-lg font-semibold text-green-800">
                    Your request has been accepted.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                    <strong>{order?.worker?.first_name}</strong> is on their way and will be arriving shortly to assist you.
                    Please make sure to keep your phone handy in case they need to reach out for any further instructions.
                </p>
            </div>
        </div>
    </div>
  )
}

export default ServiceAcceptedPopup
