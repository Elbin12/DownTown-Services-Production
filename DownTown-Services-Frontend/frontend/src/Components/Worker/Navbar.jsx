import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/LOGO.png';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerinfo } from '../../redux/worker';
import {api} from '../../axios'
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Location from '../User/Location';
import { useLoadScript } from "@react-google-maps/api";
import { BiSolidMessageDetail } from "react-icons/bi";




function Navbar({setChats}) {
  const [activePopup, setActivePopup] = useState(null);
  const workerinfo = useSelector(state=>state.worker.workerinfo)
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState(workerinfo? workerinfo.location:'');

  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatNotifications, setShowChatNotifications] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  const logout  = async ()=>{
    const res = await api.post('worker/logout/')
    if(res.status == 205){
      dispatch(setWorkerinfo(''))
      navigate('/')
    }
  }
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/notification/${workerinfo.id}/`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Notification received:", data.notification, data);
      try{
        if (data.type === 'recentchats'){
          console.log('chats updated vannu', data)
          setChats(data.notification);
        }else if (data.type === 'chat_message'){
          setChatMessages((prevNotifications)=>[data.notification, ...prevNotifications])
        }else if(data.type === 'update_notifications'){ 
          console.log('vvvvaaaannnuuuu')
          setChatMessages([]);
          setNotifications(data.notification)
        }else if(data.type === 'notification'){
          setNotifications((prevNotifications)=>[data.notification, ...prevNotifications])
        }
      }catch(err){
        console.log(err, 'err')
      }
    
    return () => {
      socket.close();
    }}
  }, [workerinfo.id]);


  console.log(notifications, 'notifications')
  return (
    <>
      {activePopup==='location' && <Location role={'worker'} location={location} setLocation={setLocation} setActivePopup={setActivePopup}/>}
      <div className='flex justify-between w-full flex-column fixed top-0 z-20 bg-[#eff8f4] h-24 items-center px-5 sm:px-20 md:px-20'>
        <div className="logo cursor-pointer h-1/3 items-center flex gap-8">
          <img src={Logo} alt="Logo" onClick={() => { navigate('/worker/dashboard/') }}/>
          <div className={`border-x px-4 py-5 cursor-pointer border-[#25252557] w-auto h-full flex items-center ${window.location.pathname.includes('add-service')&& 'bg-[#f9f5e1] border-x-0'}`}  onClick={() => { navigate('/worker/add-service/') }}>
            <h1 className={`font-semibold mr-1 text-lg text-slate-800`}>Add Services</h1>
            <IoAddCircleSharp className='text-2xl text-slate-800'/>
          </div>
        </div>

        <div className='flex w-1/2 items-center gap-4 justify-end'>
          <div className='md:flex hidden'>
            <div className={`border-r cursor-pointer border-[#25252557] w-24 text-center h-6 flex items-center justify-center ${window.location.pathname.includes('services')&&'text-sky-900'}`} onClick={()=>{navigate('/worker/services/')}}>
              <h4 className='text-sm font-semibold'>Services</h4>
            </div>
            <div className={`border-r cursor-pointer border-[#25252557] w-24 text-center h-6 flex items-center justify-center ${window.location.pathname.includes('requests')&&'text-sky-900'}`} onClick={()=>{navigate('/worker/requests/')}}>
              <h4 className='text-sm font-semibold'>Requests</h4>
            </div>
          </div>
          
          <div className=' rounded-sm cursor-pointer bg-lime-100 border-[#25252557] w-24 text-center h-9 flex items-center justify-center gap-1' onClick={()=>{setActivePopup('location')}}>
            <h4 className='text-sm font-semibold'>{location?.split(',')[0].slice(0,5)}</h4>
            <MdOutlineArrowDropDown className='text-black text-2xl'/>
          </div>
          <div
            className='relative flex border  px-2 h-9 justify-center items-center rounded-sm cursor-pointer'
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <div className='bg-green-400 w-6 h-6 rounded-full font-bold mr-1 text-white text-xs flex justify-center items-center'>
              <h4>{workerinfo?.first_name && workerinfo.first_name[0]}</h4>
            </div>
            <h1 className='font-semibold md:block hidden text-sm mr-3'>Hi, {workerinfo?.first_name}</h1>
            <IoIosArrowDown className='mt-1 md:block hidden' />
            {showPopup && (
              <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
                <div className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{navigate('/worker/profile/')}}>
                  <AiOutlineUser className='text-2xl'/>
                  <div>
                    <h4 className='font-semibold text-sm'>My Profile</h4>
                    <p className='text-xs'>Manage your profile, login details and password</p>
                  </div>
                </div>
                <div className='flex gap-4 hover:bg-blue-50 p-3'>
                  <CiWallet className='text-2xl'/>
                  <div>
                    <h4 className='font-semibold text-sm'>My Wallet</h4>
                    <p className='text-xs'>Use your wallet money to avail even greater discounts</p>
                  </div>
                </div>
                <div className='flex gap-4 hover:bg-blue-50 p-3' onClick={logout}>
                  <CiLogout className='text-2xl'/>
                  <div>
                    <h4 className='font-semibold text-sm'>Sign Out</h4>
                    <p className='text-xs'>Log out from Downtown services</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex">
            <BiSolidMessageDetail className="text-xl cursor-pointer" onMouseEnter={() => setShowChatNotifications(true)} onMouseLeave={() => setShowChatNotifications(false)}/>
            {chatMessages?.length > 0 && (
              <span className="absolute top-0 right-0 bg-slate-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                {chatMessages.length}
              </span>
            )}
          </div>
          <div className="relative flex">
            <IoIosNotifications className="text-xl cursor-pointer" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}/>
            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 bg-slate-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                {notifications.length}
              </span>
            )}
          </div>
          {showChatNotifications && (
              <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
                {chatMessages?.length > 0 && chatMessages?.map((message, index)=>(
                  <div key={index} className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{navigate('/worker/profile/')}}>
                    <img src={message?.sender?.profile_pic} alt="" className='w-9 h-9 object-cover rounded-full'/>
                    <div>
                      <h4 className='font-semibold text-sm'>{message.sender?.first_name}</h4>
                      <p className='text-xs'>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          {showNotifications && (
            <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
              {notifications?.map((notification, index)=>(
                <div key={index} className='flex gap-4 hover:bg-blue-50 p-3'>
                  <div>
                    <p className='text-xs'>{notification}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
