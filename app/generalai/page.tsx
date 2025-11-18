import { ChatProvider } from "@/context/ChatContent";
import { ChatInput } from "@/components/ui/chat/ChatInput";
import { ChatMessages } from "@/components/ui/chat/ChatMessage";

export default function Page() {
  return (
    <ChatProvider>
      <ChatMessages />
      <ChatInput />
    </ChatProvider>
  );
}
