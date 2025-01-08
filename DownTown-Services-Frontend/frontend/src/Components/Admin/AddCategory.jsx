import React, { useRef, useState } from 'react'
import { api } from '../../axios';
import {toast} from 'sonner';

function AddCategory({setCategories}) {
    const [category_name, setCategory] = useState();
    const [err, setErr] = useState();

    const input = useRef();    

    const handleSubmit =async ()=>{

        try {
            const res = await api.post('admin/categories/',{'category_name':category_name   });
            console.log(res.data, res);
            setCategories(prevCategories => [...prevCategories, res.data]);
            setCategory('')
            input.current.value = ''
            toast.success('Category added sucessfully')
          } catch (err) {
            console.log(err); 
            if (err.response.data?.category_name){
              setErr(err.response.data.category_name[0])
            }else{
              setErr(err.response.data.non_field_errors)
            }
          }
    }
  return (
    <div className=' w-2/5 bg-white flex flex-col justify-between rounded-lg h-56'>
        <div className='border-b py-2 px-4'>
            <h3 className='text-lg '>Add a category</h3>
        </div>
        <div className='h-full flex flex-col justify-center w-full items-center'>
            <div className='flex flex-col gap-4'>
                <div>
                    <li className='list-none mb-1 text-sm'>Category Name</li>
                    <input type="text" className='outline-none border pl-2 py-1 rounded-sm' ref={input} onChange={(e)=>{setCategory(e.target.value)}}/>
                    <p className='text-red-500 text-xs'>{err}</p>
                </div>
                <button className='border w-1/2 bg-[#fce7a9] py-1' onClick={handleSubmit}>Add</button>
            </div>
        </div>
    </div>
  )
}

export default AddCategory
