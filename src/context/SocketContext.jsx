import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const url = import.meta.env.VITE_SERVER_BASE_URL || "https://e-store-backend-eydi.onrender.com";
      const s = io(url, { transports: ["websocket"], withCredentials: false });
      socketRef.current = s;
      s.on("connect", () => {
        setConnected(true);
        s.emit("register", user.id || user._id);
      });
      s.on("disconnect", () => setConnected(false));
      return () => {
        s.disconnect();
        socketRef.current = null;
      };
    }
  }, [isAuthenticated, user]);

  const value = useMemo(() => ({ socket: socketRef.current, connected }), [connected]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);


