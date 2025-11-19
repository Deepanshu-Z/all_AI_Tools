"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
} from "react";
import { useChat } from "@/hooks/useChat";

export type ChatContextType = {
  msgs: { role: "user" | "bot"; content: string }[];
  input: string;
  loading: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: () => Promise<void>;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const value = useChat();
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }
  return ctx;
}
