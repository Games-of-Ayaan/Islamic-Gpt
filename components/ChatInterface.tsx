import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Sparkles, Info, BookOpen } from 'lucide-react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import { APP_NAME } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `**Assalamu Alaikum!** (Peace be upon you)\n\nI am **${APP_NAME}**, your humble assistant. I am here to help you find guidance from the **Holy Quran** and **Authentic Hadith** (Sahih Bukhari, Sahih Muslim).\n\nI will provide specific references (Surah/Ayat or Hadith numbers) for every quote.\n\n*Please note: For specific Fiqh rulings or fatwas, please always consult a qualified scholar.*`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const responseText = await geminiService.sendMessage(userText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error connecting to the service. Please try again later.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      geminiService.resetChat();
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: "**Assalamu Alaikum!** Chat has been reset. How may I assist you with the Quran or Hadith today?",
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Header */}
      <header className="flex-none bg-white border-b border-gray-200 shadow-sm z-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md text-white border-2 border-emerald-500 ring-2 ring-emerald-100">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-emerald-950 tracking-tight flex items-center gap-2">
                {APP_NAME}
              </h1>
              <p className="text-xs text-emerald-700 font-medium">Quran & Sunnah Companion</p>
            </div>
          </div>
          
          <button 
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200"
            title="Reset Conversation"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              // Animate only if it's the last message and it's from the assistant
              isAnimated={index === messages.length - 1 && msg.role === 'assistant'}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-emerald-600 ml-12 mb-6 text-sm font-medium">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="animate-pulse">Consulting sources...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Disclaimer Banner */}
      <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-2 text-center text-xs text-emerald-800 flex items-center justify-center gap-2">
         <Info size={12} />
         <span>AI can make mistakes. Always verify with a qualified scholar for fatwas.</span>
      </div>

      {/* Input Area */}
      <footer className="flex-none bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Quran, Hadith or ask a question..."
              className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-full px-6 py-3.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`
                p-3.5 rounded-full flex items-center justify-center transition-all transform duration-200
                ${!inputValue.trim() || isLoading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }
              `}
            >
              <Send size={20} className={isLoading ? "opacity-0" : "opacity-100"} />
              {isLoading && (
                 <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          </form>
          <div className="text-center mt-2 text-[10px] text-gray-400">
             Powered by Gemini 2.5
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;