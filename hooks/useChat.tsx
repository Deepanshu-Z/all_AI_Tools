"use client";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useChat() {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getFrameDetails = async () => {
    const generateFrameId = () => {
      return Math.floor(10000 + Math.random() * 90000);
    };

    const projectId = "e26d8f1a-42ca-429e-8404-e59a87abebdd";
    const frameId = 1234;
    const response = await axios.post(`/api/frame`, {
      msgs,
      projectId,
      frameId,
    });

    console.log("CHECK DB MSG UPDATED", response.statusText);
  };

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
      getFrameDetails();
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
