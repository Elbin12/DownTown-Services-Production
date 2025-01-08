import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { SlPicture } from "react-icons/sl";

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';


function AddServices() {

    const navigate = useNavigate();
    const workerinfo = useSelector(state=>state.worker.workerinfo)

    const [isLoading, setIsLoading] = useState(false);

    const [service_name, setService_name] = useState();
    const [serviceErr, setServiceErr] = useState();

    const [isCategory, setIsCategory] = useState(false);
    const [isSubategory, setIsSubcategory] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const [category, setCategory] = useState();
    const [categoryErr, setCategoryErr] = useState();

    const [subcategory, setSubcategory] = useState();
    const [subcategoryErr, setsubcategoryErr] = useState();

    const [pic, setPic] = useState();
    const [picErr, setPicErr] = useState();

    const [img, setImg] = useState();

    const [price, setPrice] = useState();
    const [priceErr, setPriceErr] = useState();

    const [description, setDescription] = useState();
    const [descriptionErr, setDescriptionErr] = useState();

    const [categories, setCategories] = useState();

    const [err, setErr] = useState();

    const [isSubscriptionValid, setIsSubscriptionValid] = useState(()=>{
        if(workerinfo?.subscription){
            if(workerinfo?.subscription?.subscription_status === 'active'){
                return true
            }
            return false
        }
        return false
    });
    
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

    const categoryClick = ()=>{
        if (!service_name){
            setServiceErr('Service name is Required')
            return
        }
        if (!pic){
            setIsImage(false);
        }
        setIsCategory(true);
    }

    const subcategoryClick = ()=>{
        if (!service_name){
            setServiceErr('Service name is Required')
            return
        }else if (!category){
            setCategoryErr('Category is required')
            return
        }
        if (!pic){
            setIsImage(false);
        }
        setIsSubcategory(true);
    }

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
        else if(!pic){
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
        setIsLoading(true);
        try{
            const res = await api.post('worker/services/', data,{
            headers: {
                'Content-Type': 'multipart/form-data'  
                }
            })
            if (res.status === 201){
                console.log(res.status, 'kkk');
                setIsLoading(false);
                toast.success('service added successfully')
                setService_name('')
                setIsCategory('')
                setSubcategory('')
                setImg('')
                setPic('')
                setPrice('')
                setDescription('')
                navigate('/worker/services/')
            }
        }catch(err){
            setIsLoading(false);
            console.log(err, 'errr', err.response.data?.message[0]); 
            toast.error(err.response.data?.message[0]);
        }
        
    }

    console.log(category, 'll', isSubscriptionValid);
    

  return (
    <div className='w-full py-9 mt-24 flex flex-col gap-1 items-center bg-white'>
        {isSubscriptionValid?
            <h1 className='text-xl font-semibold'>You have added {workerinfo?.subscription?.services_added}/{workerinfo?.subscription?.service_add_limit} services.</h1>
            :
            <div className='flex items-center mb-2 gap-3'>
                <h1 className='text-xl font-semibold'>You don't have an subscription. Please subscribe to a plan to continue.</h1>
                <button className=" bg-primary hover:bg-[#264a61f1] text-sm text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center space-x-2" onClick={()=>{navigate('/worker/subscription/plans/')}}>
                    <span>Subscribe Now</span>
                </button>
            </div>
        }
        <div className={`w-3/4 h-auto flex flex-col gap-1  ${!isSubscriptionValid && 'opacity-70'}`}>
            <div className='bg-white rounded-lg shadow-lg'>
                <div className='px-9 bg-slate-300 flex rounded-t-lg gap-11'>
                    <h1 className='text-xl py-6 font-bold'>Add a service</h1>
                    {/* {category?<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 px-4 py-7 cursor-pointer' onClick={()=>{setIsCategory(true); !pic&&setIsImage(false);}}>Edit Category</h1> 
                    :<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 px-4 py-7 cursor-pointer' onClick={categoryClick}>Add Category</h1>}

                    {subcategory? <h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 ' onClick={()=>{ !pic&&setIsImage(false);}}>Edit Subcategory</h1> 
                    :<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 ' onClick={subcategoryClick}>Add Subcategory</h1>}  */}
                    <div className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 flex gap-2 items-center' onClick={()=>{setIsImage(true); setIsCategory(false); setIsSubcategory(false);}}> 
                        <SlPicture />
                        <h1>Add Picture</h1>
                    </div>
                </div>
                <div className='flex py-9 gap-6 px-11'>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <li className='list-none font-semibold'>Service Name</li>
                        <input type="text" disabled={!isSubscriptionValid} className='border rounded-sm w-3/4 py-2 outline-none pl-4 focus:border-[#396682]' onChange={(e)=>{setService_name(e.target.value); setServiceErr('')}}/>
                        <p className='text-red-500 text-xs'>{serviceErr}</p>
                    </div>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <li className='list-none font-semibold'>Add Price</li>
                        <input type="number" disabled={!isSubscriptionValid} className='border rounded-sm w-3/4 py-2 outline-none pl-2' onChange={(e)=>{setPrice(e.target.value); setPriceErr('')}}/>
                        <p className='text-red-500 text-xs'>{priceErr}</p>
                    </div>
                    {/* {category&& <div className=' w-1/2 flex flex-col gap-2'>
                        <li className='list-none font-semibold'>category</li>
                        <h1 className='text-lg h-14 '>{category}</h1>
                    </div>}
                    {subcategory&& <div className=' w-1/2 flex flex-col gap-2'>
                        <li className='list-none font-semibold'>sub category</li>
                        <h1 className='text-lg'>{subcategory}</h1>
                    </div>} */}
                </div>
            </div>  
            <div className='shadow-lg px-11 flex flex-col justify-between gap-2 bg-white py-6 rounded-lg '>
                <li className='list-none font-semibold'>Description</li>
                <input type="text" disabled={!isSubscriptionValid} className='border rounded-sm w-3/4 py-2 outline-none pl-4 focus:border-[#396682]' onChange={(e)=>{setDescription(e.target.value); setDescriptionErr('')}}/>
                <p className='text-red-500 text-xs'>{descriptionErr}</p>
            </div>
            <div className='shadow-lg px-11 flex justify-between gap-6 bg-white py-6 rounded-lg '>
                <div className='flex flex-col w-4/5 gap-2'>
                    <li className='list-none font-semibold'>Category Name</li>
                    <div className='flex gap-6 items-end'>
                        <select disabled={!isSubscriptionValid} className='border rounded-sm w-full  h-11 outline-none px-4 focus:border-[#396682]' name="" id="" onChange={(e)=>{setCategory(parseInt(e.target.value)); setSubcategory(''); setIsCategory(false); setCategoryErr('') }}>
                        <option value=""  selected>Select a category</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category.id}>{category.category_name}</option>
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
                                        <option key={index} value={subcategory.id}>{subcategory.subcategory_name}</option>
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
            {/* {isCategory&&
                <div className='px-11 bg-white py-6 rounded-lg flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Category Name</li>
                    <div className='flex gap-6 items-end'>
                        <select className='border rounded-sm w-3/6 text-lg h-11 outline-none px-4 focus:border-[#396682]' name="" id="" onChange={(e)=>{setCategory(e.target.value); setSubcategory(''); setIsCategory(false); setCategoryErr('') }}>
                        <option value=""  selected>Select a category</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category.category_name}>{category.category_name}</option>
                        ))}
                        </select>
                    </div>
                    <p className='text-red-500 text-xs'>{categoryErr}</p>
                </div>}
                {isSubategory&&
                <div className='px-11 bg-white py-6 rounded-lg flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Sub category Name</li>
                    <div className='flex gap-6 items-end'>
                        {categories?.map((cat) => (
                            cat.category_name === category && (
                                <select 
                                    className='border rounded-sm w-3/6 text-lg h-11 outline-none px-4 focus:border-[#396682]' 
                                    name="subcategories"
                                    onChange={(e)=>{setSubcategory(e.target.value); setIsSubcategory(false);}}
                                >
                                    <option value="" selected>Select a subcategory</option>
                                    {cat.subcategories.map((subcategory, index) => (
                                        <option key={index} value={subcategory.subcategory_name}>{subcategory.subcategory_name}</option>
                                    ))}
                                </select>
                            )
                        ))}
                    </div>
                </div>} */}
            {isImage&&
            <div className='shadow-lg px-11 py-4 gap-3 h-auto mt-1 rounded-lg items-center bg-white flex flex-col'>
                <li className='list-none font-semibold'>Add a picture</li>
                <input type="file" disabled={!isSubscriptionValid} className='border rounded-sm py-2 outline-none pl-1  z-10' 
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const cachedURL = URL.createObjectURL(file);
                        setPic(file);
                        setImg(cachedURL);
                    }
                }} />
                <img src={img} alt="" accept="image/*" className={`${pic&&'h-24'}`}/>
            </div>}
            {isSubscriptionValid?
                <div className={`shadow-lg py-2 text-center bg-slate-500 rounded-lg text-white font-semibold cursor-pointer flex justify-center items-center gap-3 
                    ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`} disabled={isLoading} onClick={handleSubmit}>
                        <h1>Add Service</h1>
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                </div>
                :
                <div className={`shadow-lg py-2 text-center bg-slate-500 rounded-lg text-white font-semibold cursor-pointer flex justify-center items-center gap-3`}>
                        <h1>Add Service</h1>
                </div>
            }
        </div>
    </div>
  )
}

export default AddServices
