"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketClient } from '@/services/socket.client';
import { useAuthStore } from '@/features/auth/store/auth.store';

interface SocketContextType {
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({ isConnected: false });

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const socket = socketClient.socket;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    if (isAuthenticated && token) {
      socketClient.connect(token);
    } else {
      socketClient.disconnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socketClient.disconnect();
    };
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
