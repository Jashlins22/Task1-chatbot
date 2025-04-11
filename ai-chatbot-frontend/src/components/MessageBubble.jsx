// src/components/MessageBubble.jsx
import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ sender, message }) => {
  return (
    <div className={`message-bubble ${sender === 'user' ? 'message-user' : 'message-bot'}`}>

      {message}
    </div>
  );
};

export default MessageBubble;

