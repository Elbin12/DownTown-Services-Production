import React, { useEffect, useState } from 'react'
import { api } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react';
import ReportModal from './ReportModal';

function Orders({role}) {
    const [orders, setOrders] = useState();
    const [filter, setfilter] = useState('completed');
    const [reportingOrderId, setReportingOrderId] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchorders = async()=>{
            var url = ''
            if(role==='user'){
                url = 'orders/'
            }else if(role === 'worker'){
                url = 'worker/orders/'
            }
            try{
                const res = await api.get(url,{
                    params:{'filter_key':filter}
                })
                if(res.status === 200){
                    setOrders(res.data);
                }
            }catch(err){
                console.log('err', err)
            }
        }
        fetchorders();
    },[filter])
    console.log(orders, 'orders');

    const handleReport = (orderId) => {
        setReportingOrderId(orderId)
      }
    
  return (
    <div className={`pt-[10rem] py-4 ${orders?.length === 0 && 'h-screen'}`}>
      <div className='px-20 flex flex-col gap-2 items-center'>
        <div className='w-3/5 flex gap-3 py-2 bg-[#e1f5d39d] px-3'>
            <button className={`rounded px-3 ${filter==='completed'&&'bg-[#b9e49a9b] text-zinc-100 shadow-sm'}`} onClick={()=>{setfilter('completed')}}>Completed</button>
            <button className={`rounded px-3 ${filter==='working'&&'bg-[#b9e49a9b] text-zinc-100 shadow-sm'}`} onClick={()=>{setfilter('working')}}>Not completed</button>
            <button className={`rounded px-3 ${filter==='cancelled'&&'bg-[#b9e49a9b] text-zinc-100 shadow-sm'}`} onClick={()=>{setfilter('cancelled')}}>Cancelled</button>
        </div>
        {orders?.map((order, key)=>(
            <div className='bg-white w-3/5 h-full py-3 px-4 gap-4 cursor-pointer shadow-sm rounded-lg hover:shadow-lg flex justify-between' onClick={()=>{role==='user'?navigate(`/order/${order.id}/`):navigate(`/worker/services/accepted/${order.id}/`)}}>
                <div className='w-1/4 overflow-hidden'>
                    <img src={order?.service_image} alt="" className='w-full h-3/4 bg-cover'/>
                </div>
                <div className='w-3/4 flex flex-col gap-2  border-neutral-200'>
                    <div>
                        <h1>{order?.service_name}</h1>
                        <p className='text-xs font-semibold text-stone-500'>Serviced By - {order?.worker?.first_name}</p>
                    </div>
                    <p className='text-sm '>{order?.user_description}</p>
                    <div>
                        <div className='flex justify-between text-xs font-semibold text-stone-700'>
                            <h1>Base Price</h1>
                            <h1>Rs. {order?.service_price}</h1>
                        </div>
                        {order?.payment_details&& order?.payment_details?.additional_charges.map((charge, key)=>(
                            <div className='flex justify-between text-xs font-semibold'>
                                <h1>{charge.description}</h1>
                                <h1>Rs. {charge.price}</h1>
                            </div>
                        ))}
                    </div>
                    <div className='border-stone-400 border border-dotted'></div>
                    <div className='flex justify-between text-lg font-semibold text-neutral-800'>
                        <h1>Total Amount</h1>
                        <h1>Rs. {order?.payment_details?.total_amount}</h1>
                    </div>
                </div>
                {filter === 'completed' && role === 'user' && (
                    <div className='flex justify-end items-start mt-4 md:mt-0'>
                        <AlertCircle className='w-4 h-4 mr-1 text-red-500' onClick={(e) => {
                            e.stopPropagation()
                            handleReport(order.id)
                        }}/>
                    </div>
                )}
            </div>
        ))}
      </div>
      {reportingOrderId && (
        <ReportModal orderId={reportingOrderId} onClose={() => setReportingOrderId(null)}/>
      )}
      </div>
  )
}

export default Orders
