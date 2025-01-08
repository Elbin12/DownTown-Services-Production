import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";


function Chat({chats, role, setIsChatOpen, setWorker, selectedChatId, setSelectedChatId}) {

    const userinfo = useSelector(state=>state.user.userinfo)
    const workerinfo = useSelector(state=>state.worker.workerinfo)
    const user = role === 'user'? userinfo : workerinfo
    const [isClicked, setIsclicked] = useState(false);
    
    console.log(userinfo, 'uuuu');
    
console.log(chats, 'cahaaa', selectedChatId)
  return (
    <div className="z-20 fixed bottom-4 right-0 w-1/5 mr-3 bg-white shadow-lg rounded-lg">
        <div className={`flex items-center justify-between px-2 py-1 lg:px-9 lg:py-2 border-stone-300 ${isClicked && 'border-b'}`}>
            <img src={user.profile_pic} alt="" className=' w-3 h-3 sm:w-5 sm:h-5 lg:w-8 lg:h-8 object-cover rounded-full'/>
            <h1 className='text-[8px] sm-text-xs md:text-sm font-semibold'>Messaging</h1>
            {isClicked ? <RiArrowDownWideFill className='text-2xl cursor-pointer' onClick={()=>{setIsclicked(false)}}/>: <RiArrowUpWideFill className='text-lg md:text-2xl cursor-pointer' onClick={()=>{setIsclicked(true)}}/>}
        </div>
        {isClicked &&
            <>
                <div className='flex bg-slate-100 border mx-4 my-1 items-center px-1 py-1 gap-1 rounded'>
                    <CiSearch className='text-xl'/>
                    <input type="search" placeholder='Search Messages' className='outline-none text-sm bg-transparent'/>
                </div>
                <div className='mt-2'>
                    {chats?.map((chat, index)=>{
                        const dateObject = new Date(chat.timestamp);
                        const time = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false }).format(dateObject);

                        const isSelected = selectedChatId === (role ==='user'? chat.worker.id: chat.user.id);
                        return (
                            <div className={`px-4 flex items-center gap-2 mb-1 cursor-pointer ${isSelected ? 'bg-slate-100' : ''}`} onClick={()=>{setIsChatOpen(true); setWorker(role==='user'?chat.worker:chat.user); setSelectedChatId(role==='user'?chat.worker.id:chat.user.id);}}>
                                <img src={role === 'user' ?chat?.worker.profile_pic : chat?.user?.profile_pic} alt="" className='w-10 h-10 object-cover rounded-full'/>
                                <div className={`flex w-3/4 justify-between items-center py-2 ${!isSelected && 'border-b'}`}>
                                    <div>
                                        <h1 className='text-sm'>{role === 'user' ?chat?.worker.first_name : chat?.user?.first_name}</h1>
                                        <p className={`text-xs ${role === 'user'?chat.sender_type === 'user'? 'text-stone-500' :'font-bold':chat.sender_type === 'worker'? 'text-stone-500' :'font-bold'}`}>{chat.message}</p>
                                    </div>
                                    <p className='text-xs'>{time}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        }
    </div>
  )
}

export default Chat
