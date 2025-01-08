import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function ShowPlans({role}) {
    const [plans, setPlans] = useState();
    const [selectedPlan, setSelectedPlan] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPlans = async ()=>{
            try{
                const res = await api.get('worker/subscription_plans/')
                if(res.status === 200){
                    setPlans(res.data);
                }
            }catch(err){
                console.log(err, 'err')
            }
        }
        fetchPlans();
    },[])
    console.log(plans, 'plans')

    const handleNextpage = ()=>{
        const url = role === 'upgrade'? '/worker/upgrade/plan/' : '/worker/credit/'
        navigate(url, { state: { selectedPlan } })
    }
  return (
    <div className='h-screen bg-white'>
        <div className='mt-24 px-28 py-9 '>
            <h1 className='text-3xl font-semibold mb-9'>Choose the plan that’s right for you</h1>
            <div className='flex flex-col gap-4 items-center'>
                <div className='w-full px-9 justify-center flex gap-9'>
                    {plans?.map((plan, index)=>(
                        <div className={`border rounded-xl w-1/4 p-1.5 pb-4 cursor-pointer ${selectedPlan?.id === plan.id ? 'shadow-xl border-stone-300':'shadow-sm'}`} onClick={()=>setSelectedPlan(plan)}>
                            <div className='bg-primary rounded-lg h-20 px-4 py-4'>
                                <h1 className='text-xl text-white text-opacity-90 font-semibold'>{plan.tier_name}</h1>
                                {selectedPlan?.id === plan.id &&
                                    <div className='flex justify-end'>
                                        <div className='bg-white w-5 h-5 flex items-center justify-center rounded-full'>
                                            <TiTick />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='mx-4 border-b py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>Monthly price</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>₹{plan.price}</h1>
                            </div>
                            <div className='mx-4 border-b py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>Platform Fees (%)</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>{plan.platform_fee_perc}%</h1>
                            </div>
                            <div className='mx-4 border-b py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>Service Add Limit</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>{plan.service_add_limit}</h1>
                            </div>
                            <div className='mx-4 border-b py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>Service Edit Limit</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>{plan.service_update_limit}</h1>
                            </div>
                            <div className='mx-4 border-b py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>User Requests Limit</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>{plan.user_requests_limit}</h1>
                            </div>
                            <div className='mx-4 py-3'>
                                <h1 className='text-sm font-semibold text-stone-500'>Analytic Type</h1>
                                <h1 className='text-sm text-stone-800 font-semibold'>{plan.analytics}</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='w-1/3 bg-primary py-2 rounded text-white text-xl font-semibold hover:bg-[#38647e] cursor-pointer' onClick={handleNextpage}>Next</button >
            </div>
        </div>
    </div>
  )
}

export default ShowPlans
