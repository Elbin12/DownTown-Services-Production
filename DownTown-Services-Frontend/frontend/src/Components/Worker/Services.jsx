import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import Service from './Service';
import DeleteService from './DeleteService';

function Services() {

    const [services, setServices] = useState();

    useEffect(()=>{
        const fetchServices = async () => {
        try {
            const res = await api.get('worker/services/');
            if (res.status === 200) {
                setServices(res.data);
                console.log(res.data, 'data');
            }
        } catch (err) {
            console.error("Error fetching services", err);
        }
        };
        fetchServices();
    },[])

  return (
    <div className='min-h-screen pb-9'>
        <div className='flex flex-col items-center px-32 pt-32  gap-2' >
        {services?.map((service) => (
                <Service key={service.id} service={service} setServices={setServices}/>
            ))}
        </div>
    </div>
  )
}

export default Services
