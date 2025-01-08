import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { BsFillCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AddMobile from './AddMobile';
import MobilePopup from '../AddMobile';
import { api } from '../../../axios';
import  { setUserinfo } from '../../../redux/user';
import {setWorkerinfo} from '../../../redux/worker';

import { FaArrowRight, FaBroom, FaEdit, FaExclamationCircle } from "react-icons/fa";

import { Toaster, toast } from 'sonner';
import EditEmail from '../EditEmail';
import OTP from '../OTP/OTP';
import { useNavigate } from 'react-router-dom';

import { ArrowUpCircle, CheckCircle2, CircleAlert, Clock, DollarSign, FileText, Gauge, IndianRupee, Info, MoreVertical, Pencil, PlusCircle, RefreshCcw, User, XCircle } from 'lucide-react'


function Profile({role}) {

  const fileuploadRef = useRef();
  const [img, setImg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [activePopup, setActivePopup] = useState('');
  
  const userinfo = useSelector(state=>state.user.userinfo)
  const workerinfo = useSelector(state=>state.worker.workerinfo)
  

  useEffect(()=>{
    const fetchProfile = async() =>{
      const res = await api.get('profile/')
    }
  },[])

  console.log(userinfo, 'userrrrr');
  const [first_name, setFirst_name] = useState(()=>{
    if (role === 'user') {
      return userinfo ? userinfo.first_name === null ?'': userinfo.first_name : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.first_name === null ?'': workerinfo.first_name : '';
    }
    return '';  
  });
  const [last_name, setLast_name] = useState(() => {
    if (role === 'user') {
      return userinfo ? userinfo.last_name === null ?'': userinfo.last_name : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.last_name === null ?'': workerinfo.last_name : '';
    }
    return '';
  });
  const [dob, setDob] = useState(()=>{
    if (role === 'user') {
      return userinfo && userinfo.dob;
    } else if (role === 'worker') {
      return workerinfo && workerinfo.dob ;
    }
    return '';
  });
  const [gender, setGender] = useState();
  const [mob, setMob] = useState(()=>{
    if (role === 'user') {
      return userinfo ? userinfo.mob === null ?'': userinfo.mob : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.mob === null ?'': workerinfo.mob : '';
    }
    return '';
  });

  const [email, setEmail] = useState(()=>{
    if (role === 'user') {
      return userinfo ? userinfo.email === null ?'': userinfo.email : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.email === null ?'': workerinfo.email : '';
    }
    return '';
  });

  const [input, setInput] = useState(email);

  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedServices, setSelectedServices] = useState(workerinfo?.services);

  const [mobErr, setMobErr] = useState('');
  const [first_name_err, setFirst_name_Error] = useState('');
  const [picerr, setPicErr] = useState('');
  const [pic, setPic] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userinfo?.email, email, 'email');
  
  const imageUpload = ()=>{
    setActivePopup('save')
    fileuploadRef.current.click()
  }

  const uploadImageDisplay = (e) => {
    const uploadedFile = e.target.files[0]
    
    if (uploadedFile){
      setPic(uploadedFile)
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImg(cachedURL);    
      setPicErr('');
    }
}
  console.log(img, 'img', pic);
  
  const handlefirst_name = (e)=>{
    setActivePopup('save')
    setFirst_name(e.target.value)
    setFirst_name_Error('');
  }

  const handleimg = ()=>{
    setActivePopup('save')
  }

  const handlesubmit = async()=>{
    console.log(first_name, last_name, 'woooo');

    if (role==='user'){
      if (!img && !userinfo?.profile_pic){
        setPicErr('Profile image is Required')
        return
      }
  
      if (first_name === undefined || first_name.trim() === ''){
        setFirst_name_Error('First Name is Required')
        return
      }

        let data = {
          first_name,
          last_name,
          dob,
          gender,
          profile_pic:pic,
          mob
        }
        console.log(data, 'ddd');
        setIsLoading(true);
        try{
          const res = await api.post('profile/', data,{
            headers: {
              'Content-Type': 'multipart/form-data'  
            }
          })
          console.log('res', res.data);
          dispatch(setUserinfo(res.data))
          setActivePopup('');
          toast.success('Profile Updated Successfully')
        }catch(err){
          if (err.status===401){
            navigate('/')
            toast.error(err.response.data.message)
          }
          console.log(err.response.data, 'lll');
          setMobErr(err.response.data.mob)     
        }finally{
          setIsLoading(false);
        }
      }else if(role=='worker'){
        if (!img && !workerinfo?.profile_pic){
          setPicErr('Profile image is Required')
          return
        }
    
        if (first_name === undefined || first_name.trim() === ''){
          setFirst_name_Error('First Name is Required')
          return
        }
        let data = {
          first_name,
          last_name,
          dob,
          gender,
          profile_pic:pic,
          mob
        }
        console.log(data, 'ddd');
        setIsLoading(true);
        try{
          const res = await api.post('worker/profile/', data,{
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          })
          console.log('res', res.data);
          dispatch(setWorkerinfo(res.data))
          setActivePopup('');
          toast.success('Profile Updated Successfully')
        }catch(err){
          if (err.status===401){
            navigate('/')
            toast.error(err.response.message)
          }
          console.log(err.response.data, 'lll');
          setMobErr(err.response.data.mob)
          console.log(err.response.data.mob, 'lll');
        }finally{
          setIsLoading(false);
        }
      }
    }

    const logout = ()=>{
      api.post('logout/').then((res)=>{
        console.log(res);
        dispatch(setUserinfo(''))
        navigate('/')
      })
    }


  function formatDate(isoDate) {
    const date = new Date(isoDate); // Convert ISO string to Date object
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options)
  }
  

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const cancelSubscription = async()=>{
    try{
      const res = await api.post('worker/subscription/cancel/')
      if (res.status === 200){
        toast.success(res.data.message);
      }
    }catch(err){
      console.log(err, 'err')
    }
  }

  const handleEditServices = async()=>{
    try{
      setShowCategories(true);
      const res = await api.get('/worker/categories/')
      if (res.status === 200){
        setCategories(res.data);
      }
    }catch(err){
      console.log(err, 'err')
    }
  }


  const toggleService = (category) => {
    const service = { id: category.id, name: category.category_name };
    setSelectedServices(prev => 
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  return (
    <div className='pt-[10rem]'>
      <div className='bg-white h-64 sm:h-80 lg:h-96 mx-[1rem] sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] justify-center rounded-md flex sm:rounded-lg'>
        {activePopup=='mobAdd' && < MobilePopup role={'Add'} setActivePopup={setActivePopup} mob={mob} setMob={setMob}/>}
        {activePopup=='mobEdit' && < MobilePopup role={'Edit'} setActivePopup={setActivePopup} mob={mob} setMob={setMob}/>}
        {activePopup=='emailEdit' && < EditEmail input={input} setInput={setInput} role={role} setActivePopup={setActivePopup} email={email} setEmail={setEmail}/>}
        {activePopup=='otp' && < OTP role={role} setEmail={setEmail} input={input} setActivePopup={setActivePopup} from={'profile'}/>}
      <div className='bg-[#233e56d2] h-14 sm:h-16  md:h-20 rounded-t-md sm:rounded-t-lg w-full'>
        <div className='flex items-center gap-4 py-6 px-4 sm:px-16'>
          <div className='flex flex-col'>
            <div className='flex flex-col items-center justify-center w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] bg-white rounded-full md:w-[6rem] md:h-[6rem] drop-shadow-lg overflow-hidden' onClick={imageUpload}>
              {img? <img src={img?img:''} alt="" className='object-cover  w-full h-full p-[2px] rounded-full'/>
              : (role=='user'? userinfo?.profile_pic&&<img src={userinfo.profile_pic?`${userinfo.profile_pic}`:''} alt="" className='object-cover jjj w-full h-full p-[2px] rounded-full'/>
                : workerinfo?.profile_pic&&<img src={workerinfo.profile_pic?`${workerinfo.profile_pic}`:''} alt="" className='object-cover jjj w-full h-full p-[2px] rounded-full'/>
              )}

              <input type="file" ref={fileuploadRef} id="file" hidden accept="image/*" onChange={uploadImageDisplay} />
              {role==='user'?
                !userinfo?.profile_pic && !img&&(<>
                <BsFillCameraFill onClick={handleimg} className='text-3xl opacity-30'/>
                <h5 className='text-[9px] opacity-80' onClick={handleimg}>+ Add</h5>
                </>):
                !workerinfo?.profile_pic && !img&&(<>
                  <BsFillCameraFill onClick={handleimg} className='text-3xl opacity-30'/>
                  <h5 className='text-[9px] opacity-80' onClick={handleimg}>+ Add</h5>
                  </>)
              }
              {role=='user'?
                (img || userinfo?.profile_pic) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaEdit />
                  </div>
                ):
                (img || workerinfo?.profile_pic) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <FaEdit />
                    </div>
                )
              }
            </div>
            <p className='text-red-500 text-xs'>{picerr}</p>
          </div>
          <h6 className='text-xs pb-2 sm:text-sm sm:pb-3 md:text-lg md:pb-6 text-white font-semibold'>Hi,{role==='user'?userinfo?.first_name? userinfo.first_name:'User':workerinfo?.first_name? workerinfo.first_name:'User' }</h6>
        </div>
        <div className='px-4 sm:px-16'>
          <h1 className='text-xs md:text-2xl font-semibold text-[#434343]'>Account Details</h1>
          <div className='px-1 py-6 gap-9 flex flex-col'>
            <div className='flex  text-sm'>
            <span className='w-1/3 text-xs md:text-sm block md:hidden'>Email</span>
            <span className='w-1/3 text-xs md:text-sm hidden md:block'>Email Address</span>
              <div className='flex w-full text-xs md:text-sm'>
                <h6 className='mr-4'>{email}</h6>
                <h6 className='bg-[#aef3b5ba] px-4 items-center flex'>Verified</h6>
              </div>
              {role=='user'?
              userinfo?.email&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('emailEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>):
              workerinfo?.email&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('emailEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>)
              }
              {/* <div className='flex gap-3 items-center'>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div> */}
            </div>
            <div className='flex text-sm items-center'>
              <span className='w-1/3 text-xs md:text-sm block md:hidden'>Mobile</span>
              <span className='w-1/3 text-xs md:text-sm hidden md:block'>Mobile Number</span>
              <div className='flex w-full text-xs md:text-sm'>
                {/* <h6 className='mr-4'>{role=='user'?userinfo&& userinfo.mob:workerinfo&& workerinfo.mob}</h6> */}
                  {!mob?<AddMobile setActivePopup={setActivePopup}/>:<h6 className='mr-4'>{mob}</h6>}
                  <p className='text-red-500 text-xs'>{mobErr&& mobErr}</p>
              </div>
              {role=='user'?
              mob &&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('mobEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>):
              mob &&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('mobEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-white h-96 mx-[1rem] sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] my-2 rounded-md sm:rounded-lg'>
      <div className='px-4 sm:px-16 gap-9 flex flex-col py-9'>
        <h1 className='text-xs md:text-2xl font-semibold text-[#434343]'>Personal Details</h1>
        <div className='flex flex-col gap-6 text-sm px-1'>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>First Name</h6>
            <div className='flex flex-col w-1/2'>
              <input type="text" className='border h-9 w-full rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={first_name} onChange={handlefirst_name}/>
              <p className='text-red-500 text-xs'>{first_name_err}</p>
            </div>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Last Name</h6>
            <input type="text" className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={last_name} onChange={(e)=>{setLast_name(e.target.value); setActivePopup('save')}}/>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Birthday (Optional)</h6>
            <input type="date" value={dob} className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' onChange={(e)=>{setDob(e.target.value); setActivePopup('save')}}/>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Gender (Optional)</h6>
            {role==='user'?
            <div className='flex w-1/2 gap-9'>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Woman': userinfo?.gender == 'Woman')&&'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Woman')
                setActivePopup('save')
              }}>Woman</button>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Man': userinfo?.gender == 'Man') && 'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Man') 
                setActivePopup('save')}}>Man</button>
            </div>:
              <div className='flex w-1/2 gap-9'>
                <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Woman': workerinfo ?.gender == 'Woman')&&'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                  setGender('Woman')
                  setActivePopup('save')
                }}>Woman</button>
                <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Man': workerinfo ?.gender == 'Man') && 'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                  setGender('Man') 
                  setActivePopup('save')}}>Man</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    {role==='worker' && 
      <div className="bg-white mx-auto sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] my-2 sm:rounded-lg shadow-md p-6 sm:p-8">
        <div className='flex w-full justify-between items-center mb-6'>
          <h2 className="text-2xl font-semibold text-gray-800">Your Services</h2>
          <Pencil className='w-5 h-5 cursor-pointer' onClick={handleEditServices}/>
        </div>
        
        <div className="space-x-4 flex">
          {selectedServices.map(service => (
            <div key={service.id} className="flex w-1/6 items-center justify-center  bg-gray-200 py-3 rounded-md">
              <h1 className="text-lg font-medium text-gray-700">{service.name}</h1>
            </div>
          ))}
        </div>

        {role==='worker' && showCategories && (
          <div className='mt-6'>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Available Services:</h3>
            <div className="flex flex-wrap gap-4">
              {categories.map(category => {
                const isSelected = selectedServices?.some(s => s.id === category.id);
                return (
                  <div
                    key={category.id}
                    className={`flex items-center justify-center py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => toggleService(category)}
                  >
                    <h1 className="text-lg font-medium">{category.category_name}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {workerinfo.services.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No services available. Please contact support to add services.
          </div>
        )}
      </div>
    }

    {workerinfo && role ==='worker' && workerinfo?.subscription&&
      <div className="bg-white    mx-auto sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] my-2 sm:rounded-lg shadow-md p-6 sm:p-8 relative">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 flex-grow">
              <div>
                <div className='flex gap-9 items-center'>
                  <h2 className="text-2xl font-bold text-gray-800">Subscription Details</h2>
                  <h1 className={`font-semibold text-sm ${workerinfo.subscription?.subscription_status==='canceled'&&'text-red-500'}`}>{workerinfo.subscription?.subscription_status}
                    {/* <span className='text-black text-opacity-80 pl-2 text-xs'>
                      {workerinfo.subscription?.subscription_status==='canceled'&&'The subscription will ends in'} {formatDate(workerinfo.subscription?.subscription_end_date)}
                    </span> */}
                  </h1>
                </div>
                <p className="text-sm text-gray-600 mt-1">Your current plan and usage information</p>
              </div>
            </div>
            <div className="relative">
              <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="More options">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Invoice
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>{navigate('/worker/subscription/upgrade/plans/')}}>
                      <ArrowUpCircle className="h-4 w-4 mr-2" />
                      <span>Upgrade Plan</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={cancelSubscription}>
                      <XCircle className="h-4 w-4 mr-2" />
                      <span>Cancel Subscription</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className='bg-gray-100 rounded-full flex items-center px-3 py-1 gap-2'>
                  <span className=" text-gray-800 text-lg font-semibold">{workerinfo.subscription?.tier_name}</span>
                  {true && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <IndianRupee className="h-5 w-5" />
                <span className="text-xl font-semibold">{workerinfo.subscription?.price}</span>
                <span className="text-sm">/month</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Started on {formatDate(workerinfo.subscription?.subscription_start_date)}</span>
              </div>
            </div>
            
            <div className=" flex flex-col items-end">
              <div className='space-y-3'>
                <div className="flex items-center space-x-3 text-gray-600">
                  <PlusCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Add up to {workerinfo.subscription?.service_add_limit} services</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RefreshCcw className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Update services {workerinfo.subscription?.service_update_limit} times</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">{workerinfo.subscription?.user_requests_limit} user requests</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Gauge className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">{workerinfo.subscription?.analytics}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Platform fee: {workerinfo.subscription?.platform_fee_perc}%
              </div>
              <div className="text-sm text-gray-500">
                Subscription end date: {formatDate(workerinfo.subscription?.subscription_end_date)}
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    {role === 'worker' && !workerinfo?.subscription &&
      <div className="bg-white mx-auto sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] my-2 sm:rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <CircleAlert className="text-stone-700 w-16 h-16" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">You don't have an active subscription plan</h1>
          <p className="text-gray-600 max-w-md">Please subscribe to continue enjoying our services and unlock all the features we offer.</p>
          <button className="mt-4 bg-primary hover:bg-[#264a61f1] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center space-x-2" onClick={()=>{navigate('/worker/subscription/plans/')}}>
            <span>Subscribe Now</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    }
    <div className=' mx-[1rem] sm:mx-[5rem] lg:mx-[15rem] xl:mx-[15rem] mb-9 my-2 rounded-md sm:rounded-lg'>
      {userinfo&&<button className='bg-[#3d6b94da] px-2 py-1 rounded-sm text-white font-bold text-sm' onClick={logout}>LOGOUT</button>}
    </div>
    {activePopup==='save' &&(<div className='text-xs md:text-sm fixed flex justify-center items-center bottom-0 w-full bg-white h-20 z-10'>
      <button className={`border h-11 w-1/2 rounded-lg text-white  bg-[#3d6b94da] flex items-center justify-center ${
          isLoading ? 'cursor-not-allowed opacity-75' : ''}`} onClick={handlesubmit} disabled={isLoading}>
        <span className='mr-2'>Save Changes</span>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
      </button>
    </div>)}
    </div>
  )
}

export default Profile