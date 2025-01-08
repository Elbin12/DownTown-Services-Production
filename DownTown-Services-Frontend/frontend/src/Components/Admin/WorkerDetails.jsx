import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorker } from '../../redux/admin';
import { api } from '../../axios';
import profile from '../../images/profile.png';

function WorkerDetails() {

  const selectedWorker = useSelector(state=>state.admin.selectedWorker)
    const dispatch = useDispatch();

    const blockuser = async ()=>{
        const res = await api.post('admin/block-worker/', {"email":selectedWorker.email})
        console.log(res, 'block response');
        console.log(selectedWorker);
        const new_user = {...selectedWorker }
        new_user.is_active = res.data.isActive
        dispatch(setSelectedWorker(new_user))
    }
    
    console.log(selectedWorker);

  return (
  <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
    <div className=' w-4/5 bg-white flex flex-col mt-16 justify-between items-center rounded-lg h-4/6 py-6'>
      <div className='flex w-11/12 justify-center gap-6 items-end'>
          <div className='bg-white rounded-full w-[6rem] h-[6rem] drop-shadow-lg overflow-hidden'>
              <img src={selectedWorker.profile_pic?selectedWorker.profile_pic:profile} className='object-cover w-full h-full p-[2px] rounded-full' alt="" />
          </div>
          <div className='bg-[#3e689024] w-4/5 flex justify-between py-4 px-9 items-start rounded-lg'>
              <div >
                  <h4>{selectedWorker?.first_name} {selectedWorker?.last_name}</h4>
                  <h4>{selectedWorker?.email}</h4>
                  <h4>{selectedWorker?.mob}</h4>
              </div>
              <div className='    '>
                <button className='border border-gray-500  rounded-lg bg-white px-6 py-1' onClick={blockuser}>{selectedWorker?.is_active ? "BLOCK" : 'UNBLOCK'}</button>
                <p className={`py-2 text-xs ${selectedWorker.status === 'verified'?'text-green-500':'text-red-600'} font-bold tracking-wider`}> <span className='text-stone-700'>Status :</span> {selectedWorker.status}</p>
              </div>
          </div>
      </div>
      <div className='bg-white border rounded-lg drop-shadow-lg h-3/5 w-11/12 px-9 py-4'>
          <h2 className='font-semibold text-[#4f4f4f]'>Recent Orders</h2>
          <div>

          </div>
      </div>
    </div>
  </div>
  )
}

export default WorkerDetails
