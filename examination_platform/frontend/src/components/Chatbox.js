import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message) return;

    // Add user's message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', { message });
      setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setMessage('');
  };

  return (
    <div>
      <h2>AI Chatbot</h2>
      <div className="chat-box" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender}>
            <strong>{chat.sender}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px' }}>Send</button>
    </div>
  );
};

export default Chatbox;
