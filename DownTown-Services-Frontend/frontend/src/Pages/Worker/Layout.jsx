import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';
import Footer from '../../Components/User/Footer';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Worker/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

function Layout({children}) {
    const [isChatOpen, setIsChatOpen] = useState();
    const [worker, setWorker] = useState();
    const [chats, setChats] = useState();
    const [selectedChatId, setSelectedChatId] = useState(null);

    const workerinfo = useSelector(state=>state.worker.workerinfo)
    const navigate = useNavigate();

    const location = useLocation();

    const excludePaths = ["/worker/login/", "/worker/signup/"];

    const shouldShowLayout = !excludePaths.includes(location.pathname);

    console.log(workerinfo, 'workerinfo')
    
    useEffect(()=>{
        const fetchChats = async()=>{
            try{
                const res = await api.get('worker/chats/')
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
    console.log(shouldShowLayout, 'lll')
  return (
    <>
    {shouldShowLayout && 
        <Navbar setChats={setChats} setIsChatOpen={setIsChatOpen} setWorker={setWorker}/>
    }
    <>
        {children}
    </>
    {workerinfo&&
        <>
            <Chat chats={chats} role='worker' setIsChatOpen={setIsChatOpen} setWorker={setWorker} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
            {isChatOpen&&
                <ChatDetails setChats={setChats} role='worker' setIsChatOpen={setIsChatOpen} user={worker} setSelectedChatId={setSelectedChatId}  />
            }</>
    }
    {shouldShowLayout && 
        <Footer />
    }
    </>
  )
}

export default Layout
