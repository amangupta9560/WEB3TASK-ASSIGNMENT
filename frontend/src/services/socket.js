import { io } from 'socket.io-client';

const DEFAULT_SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const FALLBACK_SOCKET_URL = 'http://localhost:5001';

let socket = null;
let activeSocketUrl = DEFAULT_SOCKET_URL;

export const getSocket = () => {
  if (!socket) {
    socket = io(activeSocketUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log(`[Socket] Connected to ${activeSocketUrl}, ID:`, socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.warn(`[Socket] Connection error on ${activeSocketUrl}:`, error.message);
      if (activeSocketUrl === DEFAULT_SOCKET_URL && DEFAULT_SOCKET_URL.includes(':5000')) {
        console.log('[Socket] Retrying connection on fallback port 5001...');
        activeSocketUrl = FALLBACK_SOCKET_URL;
        socket.disconnect();
        socket = null;
        getSocket().connect();
      }
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};