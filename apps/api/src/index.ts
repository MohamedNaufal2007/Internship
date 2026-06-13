import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { apiRoutes } from './routes/index.js';
import { setupGraphQL } from './graphql/setup.js';

const app = express();
const httpServer = createServer(app);

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// REST API Routes
app.use('/api', apiRoutes);

// GraphQL Setup
const apolloServer = await setupGraphQL();
await apolloServer.start();
app.use('/graphql', expressMiddleware(apolloServer, { context: async ({ req }) => ({ user: req.user }) }));

// Socket.IO Configuration
const io = new SocketIOServer(httpServer, {
  cors: corsOptions,
  transports: ['websocket', 'polling'],
});

// Socket.IO Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication required'));
  try {
    socket.user = authenticateToken(token);
    next();
  } catch (err) {
    next(err);
  }
});

// Socket.IO Event Handlers
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  socket.on('join-complaint', (complaintId) => {
    socket.join(`complaint-${complaintId}`);
  });

  socket.on('leave-complaint', (complaintId) => {
    socket.leave(`complaint-${complaintId}`);
  });

  socket.on('send-message', async (data) => {
    io.to(`complaint-${data.complaintId}`).emit('new-message', data);
  });

  socket.on('update-complaint-status', async (data) => {
    io.to(`complaint-${data.complaintId}`).emit('status-updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.API_PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
});

export { app, httpServer, io };
