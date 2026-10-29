require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const initSocketHandler = require('./utils/socketHandler');

const app = express();
const server = http.createServer(app);

connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

initSocketHandler(io);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('YouTube Watch Party Server is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

app.use(notFound);
app.use(errorHandler);

let PORT = process.env.PORT || 5000;

function startServer(port) {
  server.listen(port, () => {
    console.log(`[Server] YouTube Watch Party Server running on port ${port}`);
    console.log(`[WebSocket] Socket.IO active and ready for room synchronization`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`[Port Conflict] Port ${PORT} is in use. Falling back to port ${fallbackPort}...`);
    PORT = fallbackPort;
    setTimeout(() => {
      try {
        server.close();
      } catch (e) {}
      startServer(PORT);
    }, 500);
  } else {
    console.error('[Server Listen Error]', err.message);
  }
});

if (process.env.NODE_ENV !== 'test') {
  startServer(PORT);
}

module.exports = { app, server };