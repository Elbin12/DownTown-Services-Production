import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import { api, BASE_URL } from '../../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Services() {

  const [services, setServices] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchServices = async () => {
      try {
        setLoading(true)
        const res = await api.get('admin/services/');
        setServices(res.data); 
        console.log(res.data, 'kkkk'); 
      } catch (err) {
        console.log(err); 
      }finally{
        setLoading(false);
      }
    };
    fetchServices();
  },[])

  return (
    <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
      <div className=' w-4/5 bg-white flex flex-col mt-16 justify-between rounded-lg h-4/6'>
        <div>
          <div className='w-4/6 flex items-center px-4 justify-between py-4'>
            <h3 className='text-xl  '>Services</h3>
            < Searchbar />
          </div>
          <table className="table-auto w-full">
            <thead className="bg-[#EDF2F9] h-auto">
              <tr className="text-sm font-semibold text-[#505050]">
                <th className="px-4 py-1.5 text-left items-center">Service</th>
                <th className="px-4 py-1.5 text-left">Worker</th>
                <th className="px-4 py-1.5 text-left">Description</th>
                <th className="px-4 py-1.5 text-left">Category</th>
                <th className="px-4 py-1.5 text-left">Price</th>
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
              
                services?.map((service, index)=>(
                  <tr key={index} className="text-xs font-semibold text-[#505050] py-6 border-b">
                    <td className="px-4 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{navigate(`/admin/service/${service.id}/`)}}>
                      <img src={service.pic} alt="" className='w-7 h-7 rounded-full' />
                      {service.service_name}
                    </td>
                    <td className="px-4 py-3 ">
                      <div className='flex gap-2 items-center cursor-pointer'>
                        <img src={service.workerProfile.profile_pic} alt="" className='w-7 h-7 rounded-full' />
                        {service.workerProfile.first_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">{service.description}</td>
                    <td className="px-4 py-3 text-xs">{service.category_name}</td>
                    <td className='px-4 py-3 text-xs' >{service.price}</td>
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

export default Services
