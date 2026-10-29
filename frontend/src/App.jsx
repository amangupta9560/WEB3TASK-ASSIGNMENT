import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchRoom from './pages/WatchRoom';
import AuthModal from './pages/AuthModal';

function App() {
  const [currentRoomId, setCurrentRoomId] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#room=')) {
      return hash.replace('#room=', '');
    }
    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'room' && pathParts[2]) {
      return pathParts[2];
    }
    return null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#room=')) {
        setCurrentRoomId(hash.replace('#room=', ''));
      } else {
        setCurrentRoomId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleJoinRoom = (roomId) => {
    window.location.hash = `#room=${roomId}`;
    setCurrentRoomId(roomId);
  };

  const handleLeaveRoom = () => {
    window.location.hash = '';
    setCurrentRoomId(null);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
        <Navbar
          currentRoomId={currentRoomId}
          onLeaveRoom={handleLeaveRoom}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <main className="flex-1">
          {currentRoomId ? (
            <WatchRoom
              roomId={currentRoomId}
              onLeave={handleLeaveRoom}
            />
          ) : (
            <Home
              onJoinRoom={handleJoinRoom}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
        </main>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}

export default App;