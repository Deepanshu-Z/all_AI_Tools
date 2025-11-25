"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatContext } from "@/context/ChatContent";

export function ChatInput() {
  const { input, setInput, sendMessage } = useChatContext();

  return (
    <div className="">
      <Textarea
        value={input}
        placeholder="Type..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
