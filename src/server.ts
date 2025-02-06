// src/index.ts
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Create a Socket.IO server with CORS enabled for all origins.
// In production, replace "*" with your client URL.
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve a simple message at the root route (optional)
app.get('/', (_req: Request, res: Response) => {
  res.send('Socket.IO Chat Server is running.');
});

// Listen for client connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for incoming chat messages
  socket.on('chat message', (msg: string) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
