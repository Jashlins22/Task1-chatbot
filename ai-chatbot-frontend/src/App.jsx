// import React from 'react'
// import ChatBox from './components/ChatBox'

// function App() {
//   return (
//     <div className="App">
//       <ChatBox />
//     </div>
//   )
// }

// export default App

// App.jsx
import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="chat-wrapper">
        <h2 className="chat-title">🤖 AI Chatbot</h2>
        <ChatBox />
      </div>
    </div>
  );
}

export default App;



