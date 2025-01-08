import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { api } from '../../axios';

function Orders() {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchOrders = async () => {
        try {
            setLoading(true)
            const res = await api.get('admin/orders/');
            setOrders(res.data); 
            console.log(res.data, 'kkkk'); 
        } catch (err) {
            console.log(err); 
        }finally{
            setLoading(false);
        }
        };
        fetchOrders();
    },[])

    return (
        <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
            <div className=' w-4/5 bg-white flex flex-col mt-16 justify-between rounded-lg h-4/6'>
                <div>
                <div className='w-4/6 flex items-center px-4 justify-between py-4'>
                    <h3 className='text-xl  '>Orders</h3>
                    < Searchbar />
                </div>
                <table className="table-auto w-full">
                    <thead className="bg-[#EDF2F9] h-auto">
                    <tr className="text-sm font-semibold text-[#505050]">
                        <th className="px-4 py-1.5 text-left items-center">Name</th>
                        <th className="px-4 py-1.5 text-left">Service</th>
                        <th className="px-4 py-1.5 text-left">Serviced By</th>
                        <th className="px-4 py-1.5 text-left">Price</th>
                        <th className="px-4 py-1.5 text-left">Status</th>
                        <th className="px-4 py-1.5 text-left">Payment Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading?
                        <tr>
                        <td colSpan="4" className="text-center font-semibold py-8">
                            LOADING...
                        </td>
                        </tr>
                    :
                    
                        orders?.map((order, index)=>(
                        <tr key={index} className="text-xs font-semibold text-[#505050] py-6 border-b">
                            <td className="px-4 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{navigate(`/admin/order/${order.id}/`)}}>
                                <img src={order.user.profile_pic} alt="" className='w-7 h-7 rounded-full' />
                                {order.user.first_name}
                            </td>
                            <td className="px-4 py-3 ">
                            <div className='flex gap-2 items-center cursor-pointer'>
                                <img src={order.service_image} alt="" className='w-7 h-5' />
                                {order.service_name}
                            </div>
                            </td>
                            <td className="px-4 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{navigate(`/admin/order/${order.id}/`)}}>
                                <img src={order.worker.profile_pic} alt="" className='w-7 h-7 rounded-full' />
                                {order.worker.first_name}
                            </td>
                            <td className="px-4 py-3 text-xs">{order.service_price}</td>
                            <td className='px-4 py-3 text-xs' >{order.status}</td>
                            <td className={`px-4 py-3 text-xs font-semibold ${order.payment_details?.status==='paid'?'text-green-500':'text-red-500'}`} >{order.payment_details?.status}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Orders
