import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../axios'
import Searchbar from './Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { IoIosAdd } from "react-icons/io";
import { setSelectedCategory, setselectedSubCategory } from '../../redux/admin';
import { toast } from 'sonner';


function Subcategories({setPopup}) {

    const dispatch = useDispatch();

    const selectedCategory = useSelector(state=>state.admin.selectedCategory)

    console.log(selectedCategory.subcategories, 'kkkh');

    useEffect(()=>{
        return () => {
            dispatch(setSelectedCategory([]))
        }
    }, [])
    

    const addSub =()=>{
        console.log(selectedCategory, 'seleted category');
        
        if (selectedCategory.length === 0){
            toast.error('Please select a category first')
            return
        }
        setPopup('Addsub')
    }

  return (
    <div className=' w-3/4 bg-white flex flex-col rounded-lg'>
        <div className='w-full py-4 px-4 flex justify-between gap-9'>
            <h3 className='text-lg '>Sub Categories</h3>
            < Searchbar />
            <div className='flex items-center text-[#474747] cursor-pointer' onClick={addSub}>
                <IoIosAdd className='text-3xl' />
                <h2>Add a sub category</h2>
            </div>
        </div>
        <table className="table-auto w-full">
            <thead className="bg-[#EDF2F9] h-auto">
            <tr className="text-sm font-semibold text-[#505050]">
                <th className="px-8 py-1.5 text-left items-center">Sub category</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {!selectedCategory.subcategories ? (
                        <tr>
                            <td className="px-8 py-3 flex gap-2 items-center">
                                Please select a category first
                            </td>
                        </tr>
                    ):
                selectedCategory.subcategories.length === 0?
                <tr><td className="px-8 py-3 flex gap-2 font-semibold items-center text-[#505050]">No Sub categories</td></tr>:
                selectedCategory.subcategories?.map((subcategory, index)=>(
                <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                    <td className="px-8 py-3 flex gap-2 items-center cursor-pointer">
                    {subcategory.subcategory_name}
                    </td>
                    <td className=' pr-6'>
                        <div className='flex justify-end '>
                            <MdOutlineEdit className='mr-2 cursor-pointer' onClick={()=>{dispatch(setselectedSubCategory(subcategory)); setPopup('sub')}}/> 
                            <MdDeleteForever className='cursor-pointer' onClick={()=>{setPopup('Delsub'); dispatch(setselectedSubCategory(subcategory))}}/>
                        </div>
                    </td>
                </tr>
                ))
            }      
            </tbody>
        </table>
    </div>
  )
}

export default Subcategories
