import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { api } from '../../axios';
import { toast } from 'sonner';

function AddSubscription({role, subscription, setPopup, setSubscriptions}) {
    const [showDetail, setShowDetail] = useState('');

    const [tierName, setTierName] = useState(subscription? subscription.tier_name : '');
    const [price, setPrice] = useState(subscription? subscription.price : '');
    const [platform_fees, setPlatformFees] = useState(subscription? subscription.platform_fee_perc : '');
    const [ServiceAddLimit, setserviceAddLimit] = useState(subscription? subscription.service_add_limit : '');
    const [ServiceUpdateLimit, setserviceUpdateLimit] = useState(subscription? subscription.service_update_limit : '');
    const [UserRequestLimit, setUserRequestLimit] = useState(subscription? subscription.user_requests_limit : '');
    const [analyticsType, setAnalyticsLimit] = useState(subscription? subscription.analytics : '');  

    const [validationError, setValidationError] = useState('');

    const handleSubmit = async()=>{
        if (tierName.trim() === ''){
            setValidationError('Tier name is required')
            return
        }else if (price === ''){
            setValidationError('Monthly price is required')
            return
        }else if (platform_fees === ''){
            setValidationError('Platform fees is required')
            return
        }else if (ServiceAddLimit.trim() === ''){
            setValidationError('Service add limit is required')
            return
        }else if (ServiceUpdateLimit.trim() === ''){
            setValidationError('Service update limit is required')
            return
        }else if (UserRequestLimit.trim() === ''){
            setValidationError('User request limit is required')
            return
        }else if (analyticsType.trim() === ''){
            setValidationError('Analytic type is required')
            return
        }

        const data = {
            'tier_name':tierName,
            'price':price,
            'platform_fee_perc':platform_fees,
            'service_add_limit':ServiceAddLimit,
            'service_update_limit':ServiceUpdateLimit,
            'user_requests_limit':UserRequestLimit,
            'analytics':analyticsType
        }
        if (role === 'add'){
            try{
                const res = await api.post('admin/subscriptions/', data)
                if(res.status === 201){
                    console.log(res.data, 'll')
                    setSubscriptions((prev)=>[res.data, ...prev])
                    toast.success('Subscription added successfully');
                    setPopup('');
                }
                console.log(res.data, 'datataa')
            }catch(err){
                console.log('err', err)
            }
        }else if(role === 'edit'){
            try{
                const res = await api.put(`admin/subscription/${subscription.id}/`, data)
                if(res.status === 200){
                    console.log(res.data, 'll')
                    setSubscriptions((prev)=>{
                        return prev.map((sub) =>
                            sub.id === subscription.id ? res.data : sub
                        );
                    })
                    toast.success('Subscription edited successfully');
                    setPopup('');
                }
                console.log(res.data, res,  'edittt')
            }catch(err){
                console.log('err', err)
            }
        }
    }

    console.log(subscription, 'sss')
    
  return (
    <div className='fixed z-10 h-screen w-full flex items-center justify-center pl-28 bg-[#0b0b0ba2]'>
        <div className='w-3/4 bg-white flex flex-col gap-5 rounded-lg'>
            <div className='flex justify-between px-3 py-2 border-b t border-stone-300'>
                <h1 className='font-semibold'>{role === 'add' ? 'Add a' : 'Edit'} subscription plan</h1>
                <IoIosCloseCircle className='text-2xl cursor-pointer' onClick={()=>{setPopup('')}}/>
            </div>
            <div className='px-6 grid grid-rows-3 gap-4 grid-cols-3'>
                <div>
                    <label className='block mb-1 text-sm font-semibold'>Tier Name:</label>
                    <input type="text" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={tierName} placeholder="Enter the tier name" onChange={(e)=>{setTierName(e.target.value);  setValidationError('')}}/>
                </div>
                <div>
                    <label className='block mb-1 text-sm font-semibold'>Monthly Price:</label>
                    <input type="number" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={price} placeholder="Enter the monthly price" onChange={(e)=>{setPrice(e.target.value);  setValidationError('')}}/>
                </div>
                <div>
                    <label className='block mb-1 text-sm font-semibold'>Platform Fees (%):</label>
                    <input type="number" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={platform_fees} placeholder="Enter platform fee percentage" onChange={(e)=>{setPlatformFees(e.target.value); setValidationError('')}}/>
                </div>
                <div className='relative'>
                    <label className=' mb-1 text-sm font-semibold flex items-center gap-1'>
                        Service Add Limit:
                        <AiOutlineExclamationCircle className='text-xs cursor-pointer' onMouseOver={() => setShowDetail('service_add')} onMouseLeave={() => setShowDetail('')}/>
                    </label>
                    <input type="text" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={ServiceAddLimit} placeholder="Enter a limit or 'Unlimited'" onChange={(e)=>{setserviceAddLimit(e.target.value); setValidationError('')}}/>
                    {showDetail === 'service_add' && (
                        <div className='mt-2 absolute -top-7 text-xs left-0 bg-lime-50 border px-3 py-1 rounded text-gray-700'>
                            The maximum number of services a worker can add.
                        </div>
                    )}
                </div>
                <div className='relative'>
                    <label className='mb-1 text-sm font-semibold flex items-center gap-1'>
                        Service Update Limit:
                        <AiOutlineExclamationCircle className='text-xs cursor-pointer' onMouseOver={() => setShowDetail('service_update')} onMouseLeave={() => setShowDetail('')}/>
                    </label>
                    <input type="text" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={ServiceUpdateLimit} placeholder="Enter a limit or 'Unlimited'" onChange={(e)=>{setserviceUpdateLimit(e.target.value); setValidationError('')}}/>
                    {showDetail === 'service_update' && (
                        <div className='absolute -top-8 text-xs left-0 bg-lime-50 border px-3 py-1 rounded text-gray-700'>
                            The maximum number of services a worker can update.
                        </div>
                    )}
                </div>
                <div className='relative'>
                    <label className='mb-1 text-sm font-semibold flex items-center gap-1'>
                        User Request Limit:
                        <AiOutlineExclamationCircle className='text-xs cursor-pointer' onMouseOver={() => setShowDetail('user_requests')} onMouseLeave={() => setShowDetail('')}/>
                    </label>
                    <input type="text" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={UserRequestLimit} placeholder="Enter a limit or 'Unlimited'" onChange={(e)=>{setUserRequestLimit(e.target.value); setValidationError('')}}/>
                    {showDetail === 'user_requests' && (
                        <div className='mt-2 absolute -top-10 text-xs left-0 bg-lime-50 border px-3 py-1 rounded text-gray-700'>
                            The maximum number of user requests a worker can handle.
                        </div>
                    )}
                </div>
                <div>
                    <label className='block mb-1 text-sm font-semibold'>Analytics Type:</label>
                    <select name="" id="" className='outline-none border pl-2 py-1 text-sm rounded-sm w-full' value={analyticsType} onChange={(e)=>{setAnalyticsLimit(e.target.value); setValidationError('')}}>
                        <option value="no_analytics">No Analytics</option>
                        <option value="basic">Basic</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>
            <div className='px-6 text-red-500 text-sm'>
                <p>{validationError}</p>
            </div>  
            <button className='bg-amber-700 text-white text-sm text-opacity-90 py-2 font-semibold hover:bg-amber-800' onClick={handleSubmit}>{role ==='add'? 'Create' : 'Edit'} Subscription</button>
        </div>
    </div>
  )
}

export default AddSubscription
