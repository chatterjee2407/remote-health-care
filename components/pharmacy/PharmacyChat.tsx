'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Send, Paperclip, X, MessageSquare, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChat } from '@/contexts/ChatContext';

type PharmacyChatProps = {
  className?: string;
};

type Message = {
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

export function PharmacyChat({ className = '' }: PharmacyChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use the chat context
  const {
    messages,
    sendMessage,
    isConnected,
    unreadCount,
    markAsRead,
    isTyping,
    setIsTyping
  } = useChat();
  
  // Toggle chat visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      markAsRead();
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !fileInputRef.current?.files?.length) || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Get files if any
      const files = fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : [];
      
      // Send the message through the chat context
      await sendMessage(message, files);
      
      // Clear the input
      setMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Simulate typing indicator from pharmacist
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`.trim()}>
      {isOpen ? (
        <Card className="w-96 bg-gray-900 border-gray-800 shadow-xl">
          <CardHeader className="bg-gray-800 p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-full">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-white">Pharmacy Support</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              Online - A pharmacist is available
            </p>
          </CardHeader>
          <CardContent className="p-4 h-96 overflow-y-auto bg-gray-950">
            <div className="space-y-4">
              {/* Welcome message */}
              <div className="flex items-start gap-2">
                <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-white">Hello! I&apos;m your virtual pharmacy assistant. How can I help you today? You can ask about medications, dosages, or upload a photo of your prescription.</p>
                  <p className="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>

              {/* Messages */}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.sender === 'pharmacist' && (
                    <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.attachments.map((file, idx) => (
                          <div key={idx} className="relative group">
                            {file.type === 'image' ? (
                              <div className="relative h-32 w-32">
                                <Image 
                                  src={file.url} 
                                  alt="Uploaded medication" 
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            ) : (
                              <div className="p-2 bg-gray-700 rounded-md border border-gray-600">
                                <p className="text-xs truncate">{file.name}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-3 border-t border-gray-800 bg-gray-900">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full p-3 pr-16 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="absolute right-2 bottom-2 flex gap-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleSendMessage}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={handleFileUpload}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSendMessage}
                  disabled={isLoading || (!message.trim() && !fileInputRef.current?.files?.length)}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ask about medications, dosages, or upload a photo of your prescription
            </p>
          </div>
        </Card>
      ) : (
        <div className="relative">
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <Button 
            onClick={toggleChat}
            className="rounded-full h-14 w-14 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg relative"
            aria-label="Chat with pharmacist"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PharmacyChat;
