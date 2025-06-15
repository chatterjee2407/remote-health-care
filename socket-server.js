const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Handle incoming messages
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected clients
    io.emit('message', {
      ...msg,
      id: Date.now().toString(),
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});
