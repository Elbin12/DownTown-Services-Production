import React, { createContext, useContext, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

export const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [worker, setWorker] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        worker,
        setWorker,
        chats,
        setChats,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the chat context
export const useChat = () => useContext(ChatContext);
