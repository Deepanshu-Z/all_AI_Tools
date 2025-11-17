"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
type Messages = {
  role: "user" | "bot";
  content: string;
};
export default function page() {
  const [msg, setMsg] = useState<Messages[]>([]);
  const [input, setInput] = useState<string>();

  const handleClick = async () => {
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
    const res = await axios.post("/api/ai", { query });

    console.log(res.data);
    setMsg((prev) => [
      ...prev,
      {
        role: "bot",
        content: res.data,
      },
    ]);
  };

  return (
    <div>
      <div>
        {msg.map((item, index) => (
          <div
            className={item.role == "user" ? "justify-end" : "justify-start"}
          >
            {item.content}
          </div>
        ))}
      </div>
      <Textarea
        placeholder="Type your message here."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button className="cursor-pointer" onClick={handleClick}>
        Send message
      </Button>
    </div>
  );
}
