import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, guestName, setGuestName } = useAuth();
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tempGuest, setTempGuest] = useState(guestName || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        await login(email, password);
        onClose();
      } else if (tab === 'register') {
        await register(name, email, password);
        onClose();
      } else if (tab === 'guest') {
        if (!tempGuest.trim()) throw new Error('Please enter a nickname.');
        setGuestName(tempGuest.trim());
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex border-b border-slate-800 mb-6">
          <button
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`pb-3 text-xs font-semibold px-4 border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-red-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`pb-3 text-xs font-semibold px-4 border-b-2 transition-colors ${
              tab === 'register'
                ? 'border-red-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setTab('guest');
              setError(null);
            }}
            className={`pb-3 text-xs font-semibold px-4 border-b-2 transition-colors ${
              tab === 'guest'
                ? 'border-red-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Guest Mode
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Hunter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          {tab !== 'guest' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Choose a Guest Nickname
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Your party name..."
                  value={tempGuest}
                  onChange={(e) => setTempGuest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Join rooms right away as a guest without signing up for an account.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/25 active:scale-[0.98] mt-2 cursor-pointer"
          >
            {loading ? (
              <span>Please wait...</span>
            ) : tab === 'login' ? (
              'Sign In'
            ) : tab === 'register' ? (
              'Create Account'
            ) : (
              'Save Nickname'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;