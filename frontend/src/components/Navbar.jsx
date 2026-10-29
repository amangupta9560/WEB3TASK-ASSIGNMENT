import React from 'react';
import { Tv, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuth, currentRoomId, onLeaveRoom }) => {
  const { user, displayName, logout } = useAuth();

  const handleLogoClick = () => {
    if (currentRoomId) {
      if (confirm('Leave current watch party and return home?')) {
        onLeaveRoom?.();
        window.location.hash = '';
      }
    } else {
      window.location.hash = '';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">
                Sync<span className="text-red-500">Party</span>
              </span>
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-semibold uppercase">
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block">
              YouTube Watch Party System
            </p>
          </div>
        </div>

        {currentRoomId && (
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-slate-300">
              {currentRoomId}
            </span>
            <button
              onClick={onLeaveRoom}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-0.5 rounded-full transition-colors ml-1"
            >
              Leave
            </button>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-full">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-slate-200 hidden sm:inline">
                  {user.name}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Guest: <strong className="text-slate-200">{displayName}</strong>
              </span>
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition-all hover:text-white shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-red-500" />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;