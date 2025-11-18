"use client";

import { useState } from "react";

export function useChat() {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    setMsgs((prev) => [...prev, { role: "user", content: input }]);

    const userQuery = input;
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ query: userQuery }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let botMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      botMessage += decoder.decode(value, { stream: true });

      setMsgs((prev) => {
        // If last message is bot, update it
        const last = prev[prev.length - 1];
        if (last?.role === "bot") {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "bot", content: botMessage };
          return copy;
        }

        // Otherwise add new bot message
        return [...prev, { role: "bot", content: botMessage }];
      });
    }

    setLoading(false);
  };

  return {
    msgs,
    input,
    loading,
    setInput,
    sendMessage,
  };
}
