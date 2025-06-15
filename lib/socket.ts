import { io, type Socket, type ManagerOptions, type SocketOptions } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

// Global socket instance
let socket: Socket | null = null;

// Combined interface for socket.io options
type ISocketOptions = Partial<ManagerOptions & SocketOptions>;

export const initializeSocket = (userId: string): Socket => {
  if (typeof window === 'undefined') {
    // Return a mock socket for server-side rendering
    return {
      on: () => {},
      off: () => {},
      emit: () => false,
      disconnect: () => {},
      connected: false,
    } as unknown as Socket;
  }

  if (!socket) {
    const options: ISocketOptions = {
      query: { userId },
      withCredentials: true,
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    };

    socket = io(SOCKET_URL, options);

    // Add error handling
    socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });
  }
  
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
