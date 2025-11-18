"use client";
import { createContext, useContext } from "react";
import { useChat } from "@/hooks/useChat";

const ChatContext = createContext(null);

export const ChatContent = () => {
  const value = useChat();
  <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
