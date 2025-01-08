import React from 'react'
import { useSelector } from 'react-redux';
import { api } from '../../axios';

function DeleteService({services, setServices, setPopup}) {

    const service = useSelector(state=>state.worker.selectedService)

    console.log(service, 'service');

    const handlesubmit = async()=>{
        const id = service.id
        try{
            const res = await api.delete(`worker/services/${id}/`)
            console.log(res.status,res, 'ser');

            if (res.status === 200){
                console.log(res.status, 'ser');
                const new_ser = services.filter((ser)=>ser.id != id)
                setServices(new_ser);
                setPopup(false);
                console.log(new_ser, 'ser');
                
            }
        }catch(err){
            console.log(err); 
        }
    }
    

  return (
      <div className='fixed h-screen  left-0 w-full flex justify-center items-center z-20' onClick={()=>{setPopup(false);}}>
        <div className=' w-2/5 bg-white  flex flex-col justify-between rounded-lg h-56' onClick={(e) => e.stopPropagation()}>
            <div className='border-b py-2 px-4'>
                <h3 className='text-lg '>Delete '{service?.service_name}'</h3>
            </div>
            <div className='h-full flex flex-col justify-center w-full items-center'>
                <div className='flex flex-col gap-4'>
                        <div>
                            <h2>Are you sure to delete the service <span className='font-bold'>'{service?.service_name}'</span></h2>
                        </div>
                    <button className='border px-2 text-white bg-[#4d5954] py-1' onClick={handlesubmit}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteService
