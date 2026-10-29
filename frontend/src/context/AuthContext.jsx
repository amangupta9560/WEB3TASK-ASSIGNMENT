import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('watchparty_token') || null);
  const [guestName, setGuestNameState] = useState(localStorage.getItem('watchparty_guest_name') || '');
  const [guestId, setGuestId] = useState(() => {
    let id = localStorage.getItem('watchparty_guest_id');
    if (!id) {
      id = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      localStorage.setItem('watchparty_guest_id', id);
    }
    return id;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('watchparty_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.data.success && res.data.data.user) {
            setUser(res.data.data.user);
          }
        } catch (err) {
          console.warn('Stored token is expired or invalid:', err.message);
          localStorage.removeItem('watchparty_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    if (res.data.success) {
      const { user, accessToken } = res.data.data;
      localStorage.setItem('watchparty_token', accessToken);
      setToken(accessToken);
      setUser(user);
      return user;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register(name, email, password);
    if (res.data.success) {
      const { user, accessToken } = res.data.data;
      localStorage.setItem('watchparty_token', accessToken);
      setToken(accessToken);
      setUser(user);
      return user;
    }
    throw new Error(res.data.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('watchparty_token');
    setToken(null);
    setUser(null);
  };

  const setGuestName = (name) => {
    const clean = name.trim();
    localStorage.setItem('watchparty_guest_name', clean);
    setGuestNameState(clean);
  };

  const effectiveDisplayName = user?.name || guestName || 'Guest';
  const effectiveUserId = user?._id || user?.id || guestId;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        guestName,
        setGuestName,
        displayName: effectiveDisplayName,
        userId: effectiveUserId,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);