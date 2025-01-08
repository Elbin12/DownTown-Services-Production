import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdOutlineEdit } from 'react-icons/md'
import Searchbar from './Searchbar';
import { api } from '../../axios';
import { useDispatch } from 'react-redux';
import { IoMdAddCircle } from "react-icons/io";
import AddSubscription from './AddSubscription';

function Subscriptions() {
    const [loading, setLoading] = useState();
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState();
    const [popup, setPopup] = useState('');
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchSubscriptions = async () => {
          try {
            setLoading(true)
            const res = await api.get('admin/subscriptions/');
            if (res.status === 200){
                setSubscriptions(res.data)
            }
            console.log(res.data); 
          } catch (err) {
            console.log(err); 
          }finally{
            setLoading(false);
          }
        };
        fetchSubscriptions();
    },[])

    console.log(subscriptions, 'subscriptions', 'lll');

    const handleEdit = (category)=>{
        setPopup('cat');
    }

    const handleDelete = (category)=>{
      setPopup('Delcat');
    }

  return (
    <>
        {popup === 'add'&&
            <AddSubscription role='add' setPopup={setPopup} setSubscriptions={setSubscriptions}/>  
        }
        {popup === 'edit'&&
            <AddSubscription role='edit' subscription={selectedSubscription} setPopup={setPopup} setSubscriptions={setSubscriptions}/>  
        }
        <div className='w-screen flex justify-end overflow-y-auto'>
            <div className='w-4/5 mt-28 flex items-center flex-col gap-6 py-9'>
                <div className='flex w-full  items-center gap-14'>
                    <div className=' w-3/4 bg-white flex flex-col justify-between rounded-lg h-full'>
                        <div>
                            <div className='w-full flex items-center px-6 justify-between py-4'>
                                <h3 className='text-lg'>Subscriptions <span className='text-xs'>For Worker</span></h3>
                                < Searchbar />
                                <div className='flex items-center gap-2 border px-1 py-1 rounded-full text-opacity-90 text-white font-semibold cursor-pointer bg-amber-700' onClick={()=>{setPopup('add')}}>
                                    <h1 className='pl-4 text-sm'>Add a subcription plan</h1>
                                    <IoMdAddCircle className='text-xl text-end'/>
                                </div>
                            </div>
                            <table className="table-auto w-full">
                                <thead className="bg-[#EDF2F9] h-auto">
                                <tr className="text-sm font-semibold text-[#505050]">
                                    <th className="px-8 py-1.5 text-left items-center">Name</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading&&
                                    <tr>
                                    <td colSpan="4" className="text-center font-semibold py-8">
                                        LOADING...
                                    </td>
                                    </tr>
                                }
                                {subscriptions && subscriptions.length > 0?
                                    subscriptions?.map((subscription, index)=>(
                                    <tr key={index} className={`'text-sm font-semibold text-[#505050] py-6 border-b'  `}>
                                        <td className="px-8 py-3 flex gap-2 items-center cursor-pointer" >
                                        {subscription.tier_name}
                                        </td>
                                        <td className= 'pr-6'>
                                        <div className='flex justify-end '>
                                            <MdOutlineEdit className='mr-2 cursor-pointer' onClick={()=>{setSelectedSubscription(subscription); setPopup('edit');}}/> 
                                            <MdDeleteForever className='cursor-pointer' onClick={()=>{handleDelete(subscription)}}/>
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                    :
                                    <tr className={`'text-sm font-semibold text-[#505050] py-6 border-b'  `}>
                                        <td className="px-8 py-3 flex gap-2 items-center cursor-pointer" >No subscriptions added</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Subscriptions
