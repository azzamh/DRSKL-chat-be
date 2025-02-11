// src/index.ts
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
// import { chatRouter } from './routes/chat.routes';
import userRouter from './users/user.routes';

const app = express();
const server = createServer(app);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A simple route
app.get('/', (_req: Request, res: Response) => {
  res.send('Socket.IO 1-on-1 Chat Server is running.');
});

// Routes
// app.use('/api/chat', chatRouter);
app.use('/api/user', userRouter);


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});





interface PrivateMessage {
  from: string;
  to: string;
  content: string;
}

const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your client URL
    methods: ["GET", "POST"]
  }
});
// Socket.IO connection handler
io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a "join" event so the client can register a unique username.
  // We use the username as a room name.
  socket.on('join', (username: string) => {
    if (typeof username === 'string' && username.trim() !== '') {
      socket.join(username);
      console.log(`Socket ${socket.id} joined room: ${username}`);
    }
  });

  // Listen for a private message event.
  socket.on('private message', (payload: PrivateMessage) => {
    console.log(`Private message from ${payload.from} to ${payload.to}: ${payload.content}`);
    // Emit the private message to the target user's room.
    io.to(payload.to).emit('private message', payload);
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
