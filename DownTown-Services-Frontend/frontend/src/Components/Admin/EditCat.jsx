import React, { useState } from 'react'
import { api } from '../../axios'
import { useDispatch, useSelector } from 'react-redux';
import { editandUpdateselectedCategory } from '../../redux/admin';

function EditCat({role, setPopup, setCategories, categories}) {

    const [input, setInput] = useState();
    const category = useSelector(state=>state.admin.selectedCategory)
    const subcategory = useSelector(state=>state.admin.selectedSubCategory) 

    const dispatch = useDispatch();
    console.log(categories, 'kkk');
    

    const handleSubmit =async()=>{
        if (role==='cat'){
            const id = category.id
            try{
                const res = await api.put(`admin/categories/${id}/`, {'category_name':input})
                console.log(res.data);
                const editedCategory = res.data;
                if (res.status===200){
                    const updatedCategories = categories.map((category) => {
                        if (editedCategory.id === category.id) {
                            return {
                                ...category,
                                category_name: editedCategory.category_name
                            };
                        }
                        return category;
                    });
                    setCategories(updatedCategories);
                    setPopup('')
                }
            }catch(err){
                console.log(err);
            }        
        }else if(role==='sub'){
            const id = subcategory.id
            try{
                const res = await api.put(`admin/subcategories/${id}/`, {'subcategory_name':input})
                console.log(res.data);
                if (res.status===200){
                    dispatch(editandUpdateselectedCategory(res.data))
                    if (res.status === 200) {
                        const updated = categories.map((cat) => {
                            if (cat.id === category.id) {
                                return {
                                    ...cat,
                                    subcategories: cat.subcategories.map((subcategory) => {
                                        if (subcategory.id === id) {
                                            return {
                                                ...subcategory,
                                                id: res.data.id,
                                                subcategory_name: res.data.subcategory_name
                                            };
                                        }
                                        return subcategory; 
                                    })
                                };
                            }
                            return cat; 
                        });
                        setCategories(updated)
                    }
                    setPopup('')
                }
                
            }catch(err){
                console.log(err);
            }
        }
    }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-20' >
        <div className=' w-2/5 bg-white flex flex-col justify-between rounded-lg h-56' onClick={(e) => e.stopPropagation()}>
            <div className='border-b py-2 px-4'>
                <h3 className='text-lg '>Edit {role==='cat'?'category':'Sub category'}</h3>
            </div>
            <div className='h-full flex flex-col justify-center w-full items-center'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <li className='list-none mb-1 text-sm'>{role==='cat'?'Category':'Sub category'} Name</li>
                        <input type="text" className='outline-none border pl-2 py-1 rounded-sm' onChange={(e)=>{setInput(e.target.value)}}/>
                    </div>
                    <button className='border w-1/2 bg-[#fce7a9] py-1' onClick={handleSubmit}>Edit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditCat
