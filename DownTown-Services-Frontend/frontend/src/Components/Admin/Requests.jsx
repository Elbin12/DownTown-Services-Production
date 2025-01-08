import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRequests } from '../../redux/admin';
import { toast } from 'sonner';
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Requests() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const workers = useSelector(state=>state.admin.requests)
    
    useEffect(()=>{
        const fetchRequests =async ()=>{
            try {
                const res = await api.get('admin/requests/');
                dispatch(setRequests(res.data)); 
                console.log(res.data); 
            } catch (err) {
                console.log(err); 
            }finally{
                setLoading(false);
            }
        }
        fetchRequests();
    },[])
    console.log(workers, 'workkk');
    

  return (
    <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
      <div className="w-4/5 bg-gray-100 flex flex-col mt-16 gap-8 rounded-lg h-4/6 pl-9 py-9 shadow-md">
        <h3 className="font-semibold text-xl text-gray-800">All Requests</h3>
        <div className="flex flex-wrap gap-6 justify-start">
            {workers?.map((worker, index) => (
            <div
                key={index}
                className="bg-white cursor-pointer shadow-lg hover:shadow-xl text-gray-700 px-6 py-5 rounded-lg flex flex-col gap-4 w-64 transition-all duration-300"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MdEmail className="text-gray-500 text-lg" />
                        <h4 className="font-medium">{worker?.email}</h4>
                    </div>
                    <IoIosArrowForward className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer" onClick={()=>{navigate(`/admin/request/${worker.id}/`)}}/>
                </div>
                <div className="flex items-center gap-3">
                    <MdPhoneAndroid className="text-gray-500 text-lg" />
                    <h4 className="font-semibold text-sm">{worker?.mob}</h4>
                </div>
            </div>
            ))}
        </div>
        </div>

    </div>
  )
}

export default Requests
