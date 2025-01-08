import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';
import Footer from '../../Components/User/Footer';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/User/Navbar/Navbar';
import { useChat } from '../../context';

function Layout({children}) {
    const {
        isChatOpen,
        setIsChatOpen,
        worker,
        setWorker,
        chats,
        setChats,
        selectedChatId,
        setSelectedChatId,
      } = useChat();

    const userinfo = useSelector(state=>state.user.userinfo)
    useEffect(()=>{
        const fetchChats = async()=>{
            try{
                const res = await api.get('chats/')
                if (res.status===200){
                    console.log(res.data, 'chatsss dataaas')
                    setChats(res.data)
                }
            }catch(err){
                console.log(err, 'errr')
            }
        }
        fetchChats();
    }, [])
  return (
    <>
    <Navbar/>
    <>
        {children}
    </>
    {userinfo && 
        <Chat role='user' chats={chats} setIsChatOpen={setIsChatOpen} setWorker={setWorker} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
    }
    {isChatOpen&&
        <ChatDetails  role='user' setIsChatOpen={setIsChatOpen} user={worker} setSelectedChatId={setSelectedChatId}/>
    }
    <Footer />
    </>
  )
}

export default Layout
