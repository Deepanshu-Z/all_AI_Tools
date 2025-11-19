import { ChatProvider } from "@/context/ChatContent";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessage";

export default function Page() {
  return (
    <ChatProvider>
      <ChatMessages />
      <ChatInput />
    </ChatProvider>
  );
}
