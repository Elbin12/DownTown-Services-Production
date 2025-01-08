import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setRequests } from '../../redux/admin';
import { toast } from 'sonner';

function RequestDetails() {
    
    const {id} = useParams();
    const [worker, setWorker] = useState();
    const [rejectReason, setRejectReason] = useState();
    const [isRejectClicked, setIsRejectClicked] = useState(false)
    const [reasonErr, setReasonErr] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchWorker = async()=>{
            try{
                const res = await api.get(`admin/worker/${id}/`)
                console.log(res.data, 'workerr')
                if (res.status === 200){
                    setWorker(res.data);
                }
            }catch(err){
                console.log('err', err);
            }
        }
        fetchWorker();
    }, [])

    const handleRequest = async(email, status)=>{
        const data = {
            'status':status,
            'email': email
        }
        if (status === 'rejected'){
            data.reason = rejectReason;
        }
        try{
            const res = await api.post('admin/handle_requests/', data)
            console.log(res.data)
            if (res.status === 200){
                if (res.data.success){
                    navigate('/admin/requests/')
                    toast.success(res.data.success) 
                }else if(res.data.failure){      
                    navigate('/admin/requests/')              
                    toast.error(res.data.failure)
                }
            }
        }catch(err){
            toast.error('Something went wrong.')
            console.log(err, 'err');
        }
    }

    const rejectRequest = ()=>{
        if(!isRejectClicked){
            setIsRejectClicked(true);
        }else{
            if(!rejectReason || !rejectReason.trim()){
                setReasonErr('Please add the reason to reject.')
            }else{
                handleRequest(worker?.email, 'rejected')
            }
        }
    }

  return (
    <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
        <div className="w-4/5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 gap-8 ">
            <div className="bg-gray-800 text-white flex flex-col items-center text-center py-4">
                <h2 className="text-xl font-semibold flex items-center gap-2"><MdEmail />{worker?.email}</h2>
                <p className="text-sm flex items-center gap-2"><MdPhoneAndroid/>{worker?.mob || "Worker Role"}</p>
            </div>
            <div className="p-4 px-9 flex justify-between gap-3">
                <div className='p-6'>
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm font-medium">Aadhaar Number</p>
                        <p className="text-gray-800">{worker?.aadhaar_no || "N/A"}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm font-medium">Location</p>
                        <p className="text-gray-800">{worker?.location || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Assigned Services</p>
                        <ul className="list-disc ml-5 text-gray-800">
                            {worker?.services && worker?.services.length > 0 ? (
                                worker?.services.map((service, index) => (
                                    <li key={index}>{service.category_name}</li>
                                ))
                                ) : (
                                <p>No services assigned</p>
                                )}
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/3 bg-gray-100 flex flex-col items-center justify-between p-6">
                    <div className="mb-6 w-full flex justify-center">
                        {worker?.certificate ? (
                        <img src={worker.certificate} alt="Certificate" className="w-full h-64 object-cover rounded-md border border-gray-300"/>
                        ) : (
                        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-md">
                            <span className="text-gray-500">No Certificate Uploaded</span>
                        </div>
                        )}
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <div className="w-full flex justify-around">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md" onClick={()=>{handleRequest(worker?.email, 'verified')}}>Accept</button>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md" onClick={rejectRequest}>Reject</button>
                        </div>
                        {
                            isRejectClicked&&
                            <div>
                                <p className='text-xs'>Add the reasons to reject <strong>{worker?.email}</strong> and click the reject button again.</p>
                                <input type="text" className='h-11 border w-full outline-none px-4' onChange={(e)=>{setRejectReason(e.target.value); setReasonErr('')}}/>
                                <p className='text-xs text-red-500'>{reasonErr}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RequestDetails
