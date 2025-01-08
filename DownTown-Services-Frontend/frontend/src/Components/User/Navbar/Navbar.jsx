import React, { useEffect } from 'react'
import './Navbar.css'
import Logo from '../../../images/LOGO.png'
import Searchbar from '../../Searchbar/Searchbar'
import { MdOutlineArrowDropDown } from "react-icons/md";
import Signin from '../Signin/Signin';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdAccountCircle } from "react-icons/md";
import OTP from '../OTP/OTP';
import Location from '../Location';
import { useLoadScript } from "@react-google-maps/api";
import { IoIosNotifications } from 'react-icons/io';
import { useChat } from '../../../context';
import { BiSolidMessageDetail } from "react-icons/bi";


function Navbar() {

  const { setChats, setIsChatOpen, setWorker } = useChat();

  const userinfo = useSelector(state => state.user.userinfo);
  const anonymous_user_location = useSelector(state=>state.anonymous_user.locationDetails)
  const [activePopup, setActivePopup] = useState(null);
  const [input, setInput] = useState();
  const [location, setLocation] = useState(userinfo? userinfo.location:anonymous_user_location? anonymous_user_location.location:'');
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatNotifications, setShowChatNotifications] = useState(false);

  console.log(userinfo, 'jjjj', anonymous_user_location);
  
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  useEffect(()=>{
    // if (!location){
    //   setActivePopup('location');
    // }
  })

  
  useEffect(()=>{
    const socket = new WebSocket(`ws://localhost:8000/ws/notification/${userinfo.id}/`);

    console.log('ooooo')
    socket.onopen = function () {
      console.log("WebSocket connection opened");
  };
  
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("Notification received:", data);
      if (data.type === 'recentchats'){
        console.log('chats updated vannu', data)
        setChats(data.notification);
      }else if(data.type === 'chat_message'){
        setChatMessages((prevNotifications)=>[data.notification, ...prevNotifications])
      }else if(data.type === 'update_notifications'){
        console.log('vvvvaaaannnuuuu')
        setChatMessages([]);
        setNotifications(data.notification)
      }else if(data.type === 'notification'){
        setNotifications((prevNotifications)=>[data.notification, ...prevNotifications])
      }
  
    return () => {
      socket.close();
    }}
  }, [])

  console.log(notifications, 'notifications from state')
  return (
    <>
      {activePopup=='login' && <Signin setActivePopup={setActivePopup} input={input} setInput={setInput}/>}
      {activePopup=='otp' && <OTP  setActivePopup={setActivePopup} input={input}/>}
      {activePopup=='location' && <Location role={'user'} location={location} setLocation={setLocation} setActivePopup={setActivePopup}/>}
      <div className='flex justify-between w-full flex-column bg-white h-24 items-center px-2 sm:px-5 lg:px-20 fixed top-0 z-20'>
        <div className="logo w-[6rem] md:w-[9rem] lg:w-[11rem] cursor-pointer" onClick={()=>{navigate('/')}}>
          <img src={Logo} alt="" className='w-full h-full object-cover'/>
        </div>
        <Searchbar />
        {!userinfo&&
          (<div className='login-button w-56 justify-center h-14 items-center flex bg-gradient-to-r from-[#3E6990CC] to-[#3E6990] rounded-lg text-white cursor-pointer' onClick={()=>{setActivePopup('login')}}>
            <h4>Login or Create Account</h4>
          </div>)
        }
        <div className='flex flex-row items-center sm:gap-2 lg:gap-6'>
          <div  className='location-button h-8 sm:h-11 lg:h-14 px-1 md:px-2 lg:px-4 justify-center flex items-center bg-[#E9E3B4] rounded-md sm:rounded-lg text-white gap-1 md:gap-3 cursor-pointer' onClick={()=>{setActivePopup('location')}}>
            <h4 className='text-[#313030] font-medium text-[9px] sm:text-xs md:text-lg'>{location?.split(',')[0].slice(0,5)}</h4>
            <MdOutlineArrowDropDown className='text-black text-sm sm:text-2xl'/>
          </div>
          {userinfo&&
            (
              <Link to='/profile/'>
              <div className='lg:border h-11 md:h-14 flex items-center gap-1 px-2 rounded-lg border-[#d5d5d5] cursor-pointer overflow-hidden'>
                {userinfo?.profile_pic?
                  <img src={userinfo?.profile_pic} alt="" className='w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover'/>
                  :
                  <MdAccountCircle className='text-4xl' />
                }
                <h6 className='text-[#303030] hidden lg:block'>Hi, {userinfo.first_name? userinfo.first_name:'User'}</h6>
              </div>
              </Link>
            )
          }
          {userinfo&&
            <>
              <div className="relative hidden sm:block">
                <BiSolidMessageDetail className="text-xl cursor-pointer" onClick={()=>{setShowChatNotifications(showChatNotifications === true? false : true)}}/>
                {chatMessages?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-slate-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                    {chatMessages.length}
                  </span>
                )}
              </div>
              {showChatNotifications && (
                <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
                  {chatMessages?.map((message, index)=>(
                    <div key={index} className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{setIsChatOpen(true); setWorker(message.sender)}}>
                      <img src={message?.sender?.profile_pic} alt="" className='w-9 h-9 object-cover rounded-full'/>
                      <div>
                        <h4 className='font-semibold text-sm'>{message.sender?.first_name}</h4>
                        <p className='text-xs'>{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          }
          {userinfo&&
          <>
            <div className="relative flex">
              <IoIosNotifications className="text-sm sm:text-xl cursor-pointer" onClick={()=>{setShowNotifications(showNotifications === true? false : true)}}/>
              {notifications?.length > 0 && (
                <span className="absolute top-0 right-0 bg-slate-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
                {notifications?.map((notification, index)=>(
                  <div key={index} className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{setIsChatOpen(true); setWorker(notification.sender)}}>
                    <div>
                      <p className='text-sm font-semibold'>{notification}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        }
        </div>
    </div>
  </>
  )
}

export default Navbar