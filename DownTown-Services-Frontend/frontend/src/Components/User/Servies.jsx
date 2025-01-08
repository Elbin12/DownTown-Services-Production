import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { useSelector } from 'react-redux';
import Service from './Service';

function Servies() {

  const [categories, setCategories] = useState();
  const [services, setServices] = useState();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  const [isAnySelected, setIsAnySelected] = useState(false);

  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  const search_key = useSelector(state=>state.user.search_key)

  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const res = await api.get('categories/');
        if (res.status === 200) {
          setCategories(res.data); 
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchCategories();
  },[])

  useEffect(()=>{
      const fetchServices = async () => {
        if (search_key){
          try {
            const res = await api.get(`services/`, {
              params: {
                search_key: search_key
              }
            });
            if (res.status === 200) {
              setServices(res.data);
              console.log(res.data, 'search', search_key);
            }
          } catch (error) {
            console.error('Error fetching services:', error);
          }
        }else if (!isAnySelected){
          try {
            const res = await api.get('services/');
            if (res.status === 200) {
                setServices(res.data);
                console.log(res.data, 'data');
            }
        } catch (err) {
            console.error("Error fetching services", err);
        }
      }
      };
      fetchServices();
  },[search_key, isAnySelected])

  
  const handleSubmit = async(newSelected)=>{
    try{  
      const res = await api.post(`services/`,{ selected_sub: newSelected, search_key:search_key })  
    if (res.status === 200){
      setServices(res.data);
    }
    }catch(err){
      console.log(err);
    }
  }

  const handleCheckbox = (cat_id, sub_id)=>{
    setSelectedSubcategories((prev)=>{
      const newSelected = {...prev}
      if (newSelected[cat_id]?.includes(sub_id)){
        newSelected[cat_id] = newSelected[cat_id].filter(id=> id !== sub_id);
      }else{
        newSelected[cat_id] = [...(newSelected[cat_id] || []), sub_id];
      }
      const hasSelection = Object.values(newSelected).some(subs => subs.length > 0);
      setIsAnySelected(hasSelection);
      return newSelected
    })

    const newSelected = { ...selectedSubcategories };
    if (newSelected[cat_id]?.includes(sub_id)) {
      newSelected[cat_id] = newSelected[cat_id].filter(id => id !== sub_id);
    } else {
      newSelected[cat_id] = [...(newSelected[cat_id] || []), sub_id];
    }
    handleSubmit(newSelected);
  }

  console.log(selectedSubcategories, 'selectedSubcategories');
  
  

  return (
    <div className='min-h-screen py-6'>
      <div className='w-full fixed h-1/2 bg-[#1d3045]'></div>
      <div className='w-full flex px-32 pt-24  gap-16' >
        <div className=' w-1/4 z-10  flex flex-col gap-4'>
          <div className='sticky top-16 flex flex-col gap-4'>
            <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-4'>
              <h1 className='font-semibold'>Popular Services</h1>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <input type="checkbox" />
                  <h4 className='text-sm'>Home Cleaning</h4>
                </div>
                <div className='flex gap-2'>
                  <input type="checkbox" />
                  <h4 className='text-sm'>Home Cleaning</h4>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-lg px-5 py-6 flex flex-col gap-9'>
                {categories?.map((category) => (
                  <div key={category.category_name} className="flex flex-col gap-4">
                    <h1 className="font-semibold">{category.category_name}</h1>
                    {category.subcategories.length > 0 ? (
                      <div className='flex gap-2 flex-col'>
                        {category.subcategories.map((sub) => (
                          <div key={sub.id} className="flex gap-2">   
                            <input type="checkbox"  onChange={()=>{handleCheckbox(category.id, sub.id)}}/>
                            <h4 className="text-sm">{sub.subcategory_name}</h4>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">No subcategories available</p>
                    )}
                  </div>
                ))}
                {/* {isAnySelected&&
                  <div className='flex cursor-pointer'>
                    <h2 className='bg-slate-600  text-white font-semibold px-3 rounded-sm py-0.5' onClick={handleSubmit}>Save</h2>
                  </div>
                } */}
            </div>
          </div>
        </div>
        <div className=' h-auto z-10 mt-14  scrollbar-none overflow-y-auto flex flex-col w-3/4 gap-4 '>
        {services && services.length!==0? services.map((service) => (
                <Service key={service.id} service={service} />
            )):
          <h1 className='text-white text-lg font-extralight'>No services found</h1>
        }
        </div>
      </div>
    </div>
  )
}

export default Servies
