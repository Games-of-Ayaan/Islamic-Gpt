import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen">
      {currentPath === '/chat' ? (
        <ChatInterface navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}
    </div>
  );
}

export default App;
