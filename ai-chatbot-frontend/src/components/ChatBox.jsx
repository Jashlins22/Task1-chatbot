// // src/components/ChatBox.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import MessageBubble from "./MessageBubble";
// import "./ChatBox.css";

// // ✅ Define the component before using it
// const ChatBox = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typing, setTyping] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: "user", message: input }];
//     setMessages(newMessages);
//     setInput("");
//     setTyping(true);

//     try {
//       const res = await axios.post("/api/chat/", {
//         message: input,
//       });

//       setMessages([
//         ...newMessages,
//         { sender: "bot", message: res.data.reply },
//       ]);
//     } catch (err) {
//       console.error("Error fetching from backend:", err);
//       setMessages([
//         ...newMessages,
//         { sender: "bot", message: "Error fetching response" },
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messages.map((msg, idx) => (
//           <MessageBubble key={idx} sender={msg.sender} message={msg.message} />
//         ))}
//         {typing && <MessageBubble sender="bot" message="Typing..." />}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// // ✅ Export the component at the end
// export default ChatBox;

import React, { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import "./ChatBox.css";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", message: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("/api/chat/", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", message: res.data.reply },
      ]);
    } catch (err) {
      console.error("Error fetching from backend:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", message: "Error fetching response" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🤖 Ava, your AI Assistant</div>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} message={msg.message} />
        ))}
        {typing && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
