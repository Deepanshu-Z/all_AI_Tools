"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Spinner } from "@/components/ui/spinner";
type Messages = {
  role: "user" | "bot";
  content: string;
};
export default function page() {
  const [msg, setMsg] = useState<Messages[]>([]);
  const [input, setInput] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    if (!input || input.trim() === "") return;
    setMsg((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    const query = input;
    setInput("");
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ query: query }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.body) {
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      setMsg((prev) => {
        setLoading(false);
        const lastMessage = prev[prev.length - 1];

        if (lastMessage && lastMessage.role === "bot") {
          const updatedMessages = [...prev];
          updatedMessages[prev.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + chunk,
          };
          return updatedMessages;
        } else {
          return [...prev, { role: "bot", content: chunk }];
        }
      });
    }
  };

  return (
    <div className=" w-full">
      <div className="flex flex-col ">
        {msg.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              item.role === "user"
                ? "self-end bg-gray-300"
                : "self-start bg-gray-400"
            } max-w-[70%] p-2 m-1 rounded-lg `}
          >
            {item.content}
          </div>
        ))}
      </div>
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-2xl">Deep thinking..</h3>
          <Spinner className="size-6" />
        </div>
      ) : (
        ""
      )}

      <Textarea
        placeholder="Type your message here."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // stops newline
            handleClick(); // send message
          }
        }}
      />

      <Button className="cursor-pointer" onClick={handleClick}>
        Send message
      </Button>
    </div>
  );
}
