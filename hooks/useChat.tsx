"use client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useChat() {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; content: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [saveDB, setSaveDB] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const projectId = useParams();
  const frameId = searchParams.get("frameId");

  useEffect(() => {
    frameId && getFrameDetails();
  }, [frameId]);

  useEffect(() => {
    if (!loading && msgs.length > 0) updateMessage();
  }, [loading]);

  const getFrameDetails = async () => {
    try {
      const response = await axios.post("/api/frame", {
        frameId,
        projectId,
      });
      setMsgs(response.data?.msgs[0].message);
    } catch (error) {
      console.log("Error in frame data getFrameDetails", error);
    }
  };

  const updateMessage = async () => {
    try {
      const response = await axios.post("/api/chats", {
        frameId,
        msgs,
      });
    } catch (error) {
      console.log("error on client side update msg", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
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
      if (done) {
        break;
      }

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
