import React, { useEffect, useState } from 'react'

function WebSocketTest() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/test/');
        
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
          console.log('messaging socket');
            const data = JSON.parse(event.data);
            setReceivedMessages(prev => [...prev, data.message]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message) {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    return (
        <div>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export default WebSocketTest;