import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import { api } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCategory } from '../../redux/admin';

function AddSub({setPopup, setCategories, categories}) {

    const selectedCategory = useSelector(state=>state.admin.selectedCategory)
    
    const [subcategory_name, setSubCategory] = useState();
    const [err, setErr] = useState();
    const dispatch = useDispatch()


    const handleSubmit =async ()=>{

        try {
            const res = await api.post('admin/subcategories/',{'subcategory_name':subcategory_name, 'category':selectedCategory.id});
            console.log(res.data, res);
            dispatch(updateSelectedCategory(res.data))
            if (res.status === 201) {
              const updated = categories.map((category) => {
                  if (category.id === selectedCategory.id) {
                      return { 
                          ...category, 
                          subcategories: [...category.subcategories, res.data] 
                      };
                  }
                  return category;
              });
          
            console.log(updated, 'updated'); 
            setCategories(updated);
            }
            setSubCategory('')
            setPopup('')
            toast.success('Category added sucessfully')
            
          } catch (err) {
            console.log(err); 
            if (err.response.data?.subcategory_name){
              setErr(err.response.data.subcategory_name[0])
            }else{
              setErr(err.response.data.non_field_errors)
            }
          }
    }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-20' >
        <div className=' w-2/5 bg-white flex flex-col justify-between rounded-lg h-56' onClick={(e) => e.stopPropagation()}>
            <div className='border-b py-2 px-4'>
                <h3 className='text-lg '>Add a Subcategory</h3>
            </div>
            <div className='h-full flex flex-col justify-center w-full items-center'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <li className='list-none mb-1 text-sm'> Subcategory Name</li>
                        <input type="text" className='outline-none border pl-2 py-1 rounded-sm' onChange={(e)=>{setSubCategory(e.target.value); setErr('')}}/>
                        <p className='text-xs text-red-500'>{err}</p>
                    </div>
                    <button className='border w-1/2 bg-[#fce7a9] py-1' onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddSub
