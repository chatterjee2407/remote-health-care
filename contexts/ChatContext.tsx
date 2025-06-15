'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { type Socket } from 'socket.io-client';
import { initializeSocket, disconnectSocket } from '@/lib/socket';
import { toast } from 'react-hot-toast';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'pharmacist';
  timestamp: Date;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
  }[];
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (text: string, attachments?: File[]) => void;
  isConnected: boolean;
  unreadCount: number;
  markAsRead: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  // Mark messages as read
  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  // Handle sending a message
  const sendMessage = useCallback((text: string, attachments: File[] = []) => {
    if (!socket) return;

    const message: Omit<Message, 'id' | 'timestamp'> = {
      text,
      sender: 'user',
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'document',
        url: URL.createObjectURL(file),
        name: file.name
      }))
    };

    // Emit the message to the server
    socket.emit('message', message);

    // Add the message to the local state immediately
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
  }, [socket]);

  // Handle window focus/blur events for unread messages
  useEffect(() => {
    const handleFocus = () => {
      setIsWindowFocused(true);
      markAsRead();
    };

    const handleBlur = () => {
      setIsWindowFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [markAsRead]);

  // Initialize socket connection
  useEffect(() => {
    // In a real app, get the user ID from your auth context
    const userId = 'user-' + Math.random().toString(36).substring(2, 11);
    const socketInstance = initializeSocket(userId);
    setSocket(socketInstance);

    // Connection events
    const handleConnect = () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    };

    const handleMessage = (message: Omit<Message, 'timestamp'> & { timestamp: string }) => {
      const newMessage: Message = {
        ...message,
        timestamp: new Date(message.timestamp)
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Increase unread count if window is not focused
      if (!isWindowFocused) {
        setUnreadCount(prev => prev + 1);
        
        // Show desktop notification
        if (Notification.permission === 'granted') {
          new Notification('New Message', {
            body: message.text || 'You have a new message',
            icon: '/pharmacy-icon.png'
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission();
        }
        
        // Show toast notification
        toast('New message received', {
          icon: '💊',
          position: 'bottom-right'
        });
      }
    };

    const handleTyping = () => setIsTyping(true);
    const handleStopTyping = () => setIsTyping(false);

    // Set up event listeners
    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('message', handleMessage);
    socketInstance.on('typing', handleTyping);
    socketInstance.on('stopTyping', handleStopTyping);

    // Clean up on unmount
    return () => {
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('message', handleMessage);
      socketInstance.off('typing', handleTyping);
      socketInstance.off('stopTyping', handleStopTyping);
      disconnectSocket();
    };
  }, [isWindowFocused]);

  // Provide the chat context
  const value: ChatContextType = {
    messages,
    sendMessage,
    isConnected,
    unreadCount,
    markAsRead,
    isTyping,
    setIsTyping
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
