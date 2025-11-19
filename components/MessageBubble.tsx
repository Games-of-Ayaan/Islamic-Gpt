import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Sparkles } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isAnimated?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isAnimated = false }) => {
  const isUser = message.role === 'user';
  const [displayedContent, setDisplayedContent] = useState(isAnimated ? '' : message.content);
  const [isTyping, setIsTyping] = useState(isAnimated);
  
  useEffect(() => {
    // If not animated, just show full content immediately (handling updates properly)
    if (!isAnimated) {
      setDisplayedContent(message.content);
      setIsTyping(false);
      return;
    }

    // Start typewriter effect
    setIsTyping(true);
    setDisplayedContent('');
    
    let currentIndex = 0;
    const fullText = message.content;
    
    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedContent(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 10); // Adjust speed: lower is faster

    return () => clearInterval(intervalId);
  }, [message.content, isAnimated]);

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-sm border
          ${isUser 
            ? 'bg-slate-800 text-white border-slate-700' 
            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
          }
        `}>
          {isUser ? <User size={18} /> : <Sparkles size={18} />}
        </div>

        {/* Bubble */}
        <div className={`
          flex flex-col p-5 rounded-2xl text-sm leading-7 shadow-sm min-h-[60px]
          ${isUser 
            ? 'bg-slate-800 text-slate-50 rounded-tr-none' 
            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-md'
          }
          ${message.isError ? 'border-red-200 bg-red-50 text-red-900' : ''}
        `}>
          {message.isError ? (
            <span className="flex items-center gap-2">
              <strong>Error:</strong> {message.content}
            </span>
          ) : (
            <div className="markdown-content relative">
              <ReactMarkdown 
                components={{
                  // Enhanced typography for Islamic content
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                  // Make headers/bold text emerald or gold
                  strong: ({node, ...props}) => <strong className={`font-bold ${isUser ? 'text-white' : 'text-emerald-800'}`} {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1 marker:text-emerald-500" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1 marker:text-emerald-500" {...props} />,
                  // Style blockquotes for verses with Serif font (Amiri)
                  blockquote: ({node, ...props}) => (
                    <blockquote className={`
                      border-l-4 border-emerald-500 pl-4 py-3 my-4 
                      bg-emerald-50/50 rounded-r-lg
                      font-serif text-lg text-emerald-900 italic
                      ${isUser ? 'bg-slate-700 text-slate-200 border-slate-500' : ''}
                    `} {...props} />
                  ),
                  code: ({node, ...props}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-emerald-600 border border-gray-200" {...props} />,
                }}
              >
                {displayedContent}
              </ReactMarkdown>
              {isTyping && (
                <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-emerald-500 animate-pulse rounded-full"></span>
              )}
            </div>
          )}
          
          <div className={`flex items-center gap-2 mt-2 text-[10px] font-medium ${isUser ? 'text-slate-400' : 'text-gray-400'}`}>
             <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             {!isUser && !message.isError && <span className="px-1">•</span>}
             {!isUser && !message.isError && <span>Islamic GPT</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;