import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../axios'
import { setSelectedCategory } from '../../redux/admin';

function DelCat({role, setPopup, setCategories, categories}) {

    const category = useSelector(state=>state.admin.selectedCategory)
    const subcategory = useSelector(state=>state.admin.selectedSubCategory)

    console.log(category.subcategories, category, 'lll', categories);
    const dispatch = useDispatch();
    

    const handleSubmit = async()=>{
        if (role==='cat'){
            const id = category.id
            try{
                const res = await api.delete(`admin/categories/${id}/`)
                console.log(res.data);
                if (res.status===200){
                    const updatedCategories = categories.filter((category) => category.id !== id);
                    setCategories(updatedCategories);
                    setPopup('')
                    dispatch(setSelectedCategory(''));
                }
            }catch(err){
                console.log(err);
            }
        }else if(role==='sub'){
            const id = subcategory.id
            try{
                const res = await api.delete(`admin/subcategories/${id}/`)
                console.log(res.data);
                if (res.status===200){
                    const updatedCategories = categories.map((cat) => {
                        if (cat.id === category.id) {
                            return {
                                ...cat,
                                subcategories: cat.subcategories.filter((sub) => sub.id !== id) 
                            };
                        }
                        return cat;
                    });
                    setCategories(updatedCategories);
                    const updated = {...category, subcategories: category.subcategories.filter((sub) => sub.id !== id)}
                    dispatch(setSelectedCategory(updated));
                    setPopup('')
                    dispatch(setSelectedCategory(''));
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
                <h3 className='text-lg '>Delete {role==='cat'?'category':'subcategory'}</h3>
            </div>
            <div className='h-full flex flex-col justify-center w-full items-center'>
                <div className='flex flex-col gap-4'>
                        <div>
                            <h2>Are you sure to delete the {role==='cat'?'category':'subcategory'} <span className='font-bold'>'{role==='cat'?category.category_name:subcategory.subcategory_name}'</span></h2>
                            {role==='cat'&&
                                <div>
                                    <p className='text-xs text-red-500 mb-2'>It will also delete all your subcategories of <span className='font-bold text-black'>'{category.category_name}'</span> category </p>
                                    {category?.subcategories?.length > 0 ? (
                                        category.subcategories.map((subcategory) => (
                                            <li className='text-xs' key={subcategory.id}>{subcategory.subcategory_name}</li>
                                        ))
                                    ) : (
                                        <p className='text-xs'>No subcategories available</p>
                                    )}
                                </div>
                            }
                        </div>
                    <button className='border px-2 bg-[#fce7a9] py-1' onClick={handleSubmit}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DelCat
