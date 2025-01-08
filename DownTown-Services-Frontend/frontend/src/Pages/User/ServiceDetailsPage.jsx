import React, { useState } from 'react'
import ServiceDetail from '../../Components/User/ServiceDetail'
import Navbar from '../../Components/User/Navbar/Navbar'
import Footer from '../../Components/User/Footer'
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';
import { useChat } from '../../context';

function ServiceDetailsPage() {
  const [recipient_id, setRecipient_id] = useState(''); 

  const { setIsChatOpen, setWorker } = useChat();

  return (
    <>
        <ServiceDetail setIsChatOpen={setIsChatOpen} setRecipient_id={setRecipient_id} setWorker={setWorker}/>
    </>
  )
}

export default ServiceDetailsPage
