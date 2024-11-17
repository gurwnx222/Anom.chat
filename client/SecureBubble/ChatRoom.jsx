import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../Stylesheets/ChatRoom.css';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish socket connection when component mounts
    const socketConnection = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');
    setSocket(socketConnection);

    // Listen for incoming messages
    socketConnection.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Ensure only two users are allowed to chat
    socketConnection.on('chat_limit_reached', () => {
      alert('The chatroom is full. You cannot join.');
      navigate('/auth');
    });

    // Clean up socket on unmount
    return () => socketConnection.disconnect();
  }, [navigate]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: 'Anonymous', // Placeholder for sender's name (since no displayName)
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      socket.emit('send_message', message); // Emit the message to the server
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chat-header">
        <h1>Welcome to SecureBubble Chatroom</h1>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
