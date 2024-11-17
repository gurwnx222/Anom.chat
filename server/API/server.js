import express from 'express';
import http from 'http';
import * as socketIo from 'socket.io';  // Fix: Import * from socket.io
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, { // Fix: socketIo.Server instead of socketIo
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5187'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Keep track of connected users (limit to 2 users)
let users = [];
const MAX_USERS = 2; // Limit to 2 users per chatroom

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Check if the room is full
  if (users.length < MAX_USERS) {
    users.push(socket.id);

    // Notify the user that the room was joined successfully
    socket.emit('chatroom_status', { message: 'Chatroom joined successfully!' });

    // Notify other users in the room
    socket.broadcast.emit('user_joined', { message: 'A new user has joined the chat' });

    // Listen for messages from clients
    socket.on('send_message', (message) => {
      io.emit('receive_message', message); // Broadcast message to all connected clients
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
      users = users.filter((userId) => userId !== socket.id);
      // Notify others that the user has left
      socket.broadcast.emit('user_left', { message: 'A user has left the chat' });
    });
  } else {
    // If the room is full, disconnect the user
    socket.emit('chat_limit_reached');
    socket.disconnect();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Graceful shutdown for production
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Gracefully shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start the server and listen on Replit's dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
