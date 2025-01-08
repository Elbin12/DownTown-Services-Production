import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { api, BASE_URL } from '../../axios';
import { MdOutlineEdit } from "react-icons/md";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


function ServiceEdit() {

    const selectedService = useSelector(state => state.worker.selectedService)

    console.log(selectedService, 'selected');

    const [isLoading, setIsLoading] = useState(false);
    

    const [service_name, setService_name] = useState(selectedService?.service_name ? selectedService.service_name : '');
    const [serviceErr, setServiceErr] = useState();

    const [category, setCategory] = useState(selectedService?.category ? selectedService.category : '');
    const [categoryErr, setCategoryErr] = useState();

    const [subcategory, setSubcategory] = useState(selectedService?.subcategory ? selectedService.subcategory : '');
    const [subcategoryErr, setsubcategoryErr] = useState();

    const [pic, setPic] = useState();
    const [picErr, setPicErr] = useState();

    const [img, setImg] = useState();

    const [price, setPrice] = useState(selectedService?.price ? selectedService.price : '');
    const [priceErr, setPriceErr] = useState();

    const [description, setDescription] = useState(selectedService?.description ? selectedService.description : '');
    const [descriptionErr, setDescriptionErr] = useState();

    const [categories, setCategories] = useState();

    const imgInput = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCategories = async () => {
        try {
            const res = await api.get('categories/');
            if (res.status === 200) {
            setCategories(res.data);
            console.log(res.data, 'data');
             
            }
        } catch (err) {
            console.error("Error fetching categories", err);
        }
        };
        fetchCategories();
    },[])

    const handleSubmit = async()=>{
        if(!service_name || service_name.trim() === ''){
            setServiceErr('Service name is required')
            return
        }else if(!price){
            setPriceErr('Price is required')
            return
        }else if(price<0){
            setPriceErr('Price should not be negative')
            return
        }else if(!description || description.trim() === ''){
            setDescriptionErr('Description is required')
            return
        }else if(!category || category === ''){
            setCategoryErr('Category is required')
            return
        }else if(!subcategory || setCategory === ''){
            setsubcategoryErr('Sub-category is required')
            return
        }
        else if(!pic && !selectedService.pic){
            setPicErr('Picture is required')
            toast.error('Picture is required')
            return
        }

        const data = {
            service_name,
            category,
            subcategory,
            pic,
            description,
            price
        }
        console.log(data, 'data', );
        const id = selectedService.id
        setIsLoading(true);
        try{
            const res = await api.put(`worker/services/${id}/`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'  
                }
            })
            if (res.status === 200){
                toast.success('service edited successfully')  
                navigate('/worker/services/')
            }
        }catch(err){
            console.log(err, 'errr'); 
        }finally{
            setIsLoading(false);
        }
    }


  return (
    <div className='w-full py-9 mt-24 flex flex-col gap-1 items-center'>
        <div className='w-3/4 h-auto  bg-white rounded-lg shadow-lg'>
            <div className='px-9 bg-slate-300 flex rounded-t-lg gap-11'>
                <h1 className='text-xl py-6 font-bold'>Edit a service</h1>
            </div>
            <div className='flex py-9 gap-6 px-11'>
                <div className='w-1/2 flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Service Name</li>
                    <input type="text" className='border rounded-sm w-3/4 py-2 outline-none pl-4 focus:border-[#396682]' value={service_name} onChange={(e)=>{setService_name(e.target.value); setServiceErr('')}}/>
                    <p className='text-red-500 text-xs'>{serviceErr}</p>
                </div>
                <div className='w-1/2 flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Add Price</li>
                    <input type="number" className='border rounded-sm w-3/4 py-2 outline-none pl-2' value={price} onChange={(e)=>{setPrice(e.target.value); setPriceErr('')}}/>
                    <p className='text-red-500 text-xs'>{priceErr}</p>
                </div>
            </div>
        </div>  
        <div className='w-3/4 px-11 flex flex-col justify-between gap-2 bg-white py-6 rounded-lg '>
            <li className='list-none font-semibold'>Description</li>
            <input type="text" className='border rounded-sm w-3/4 py-2 outline-none pl-4 focus:border-[#396682]' value={description} onChange={(e)=>{setDescription(e.target.value); setDescriptionErr('')}}/>
            <p className='text-red-500 text-xs'>{descriptionErr}</p>
        </div>
        <div className='w-3/4 px-11 flex justify-between gap-6 bg-white py-6 rounded-lg '>
            <div className='flex flex-col w-4/5 gap-2'>
                <li className='list-none font-semibold'>Category Name</li>
                <div className='flex gap-6 items-end'>
                    <select className='border rounded-sm w-full  h-11 outline-none px-4 focus:border-[#396682]' name="" id="" onChange={(e)=>{setCategory(parseInt(e.target.value)); setSubcategory(''); setCategoryErr('') }}>
                    <option value=""  selected>Select a category</option>
                    {categories?.map((category, index) => (
                        <option key={index}  selected={selectedService.category === category.id}  value={category.id}>{category.category_name}</option>
                    ))}
                    </select>
                </div>
                <p className='text-red-500 text-xs'>{categoryErr}</p>
            </div>
            <div className='flex flex-col w-4/5 gap-2'>
                <li className='list-none font-semibold'>Sub category Name</li>
                <div className='flex gap-6 items-end'>
                {category ? (
                    categories?.map((cat) => (
                        cat.id === category && (
                            <select 
                                className='border rounded-sm w-full h-11 outline-none px-4 focus:border-[#396682]' 
                                name="subcategories"
                                onChange={(e)=>{setSubcategory(parseInt(e.target.value)); setsubcategoryErr('')}}
                            >
                                <option value="" selected>Select a subcategory</option>
                                {cat.subcategories.map((subcategory, index) => (
                                    <option key={index}  selected={selectedService.subcategory === subcategory.id}  value={subcategory.id}>{subcategory.subcategory_name}</option>
                                ))}
                            </select>
                        )
                    ))
                ) : (
                    <select className='border rounded-sm w-full h-11 outline-none px-4 focus:border-[#396682]' disabled>
                        <option value="">Please select a category first</option>
                    </select>
                )}
                </div>
                <p className='text-red-500 text-xs'>{subcategoryErr}</p>
            </div>
        </div>
        <div className='w-3/4 px-11 py-4 gap-3 h-auto mt-1 rounded-lg items-center bg-white flex flex-col'>
            <li className='list-none font-semibold'>Edit picture</li>
            {<input type="file" ref={imgInput} hidden className='border rounded-sm w-3/4 py-2 outline-none pl-1  z-10' 
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const cachedURL = URL.createObjectURL(file);
                    setPic(file);
                    setImg(cachedURL);
                }
            }} />}
            <div className='w-1/5'>
                <img src={img? img : selectedService.pic} alt="" accept="image/*" className={`w-full ${pic&&''}`}/>
                <div className='flex items-center gap-2 border py-1 justify-center text-white bg-stone-400 cursor-pointer' onClick={()=>{imgInput.current.click()}}>
                    <h1 className='text-xs'>Change Image </h1>
                    <MdOutlineEdit className='text-xs'/>
                </div>
            </div>
        </div>
        <div className={`w-3/4 shadow-lg py-2 text-center bg-slate-500 rounded-lg text-white font-semibold cursor-pointer flex justify-center items-center gap-3 ${
          isLoading ? 'cursor-not-allowed opacity-75' : ''}`} disabled={isLoading} onClick={handleSubmit}>
            <h1>Edit Service</h1>
            {isLoading && (
                <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
        </div>
    </div>
  )
}

export default ServiceEdit
