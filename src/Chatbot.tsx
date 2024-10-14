import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';


const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.querySelector('.chatbot-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return; // Do not send empty messages

    // Add the user's message to the messages state
    setMessages((prevMessages) => [...prevMessages, { text, sender: 'user' }]);
    
    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // Simulate bot response (replace with actual logic)
    const botResponse = `Bot: You said "${text}"`;
    
    // Add the bot's response to the messages state after a slight delay
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className="flex justify-center h-screen bg-slate-950">
      <div className="w-full max-w-md h-128 m-10 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        <div className="flex items-center justify-center h-16 bg-blue-500 text-white text-xl">
          VSFS Analyst
        </div>
        <div className="flex-1 overflow-auto p-4 ">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-2 rounded-md mb-4 max-w-2/3 ${message.sender === 'user' ? 'bg-blue-500 text-white self-end text-right' : 'bg-gray-200 text-gray-700 self-start'}`}
              >
                {message.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center p-2">
          <input
            ref={inputRef}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md mr-2 text-black"
            type="text"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(inputRef.current?.value || '');
              }
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => sendMessage(inputRef.current?.value || '')}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
