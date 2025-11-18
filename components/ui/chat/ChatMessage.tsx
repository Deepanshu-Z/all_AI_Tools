"use client";
import { useChatContext } from "@/context/ChatContent";
import { Spinner } from "@/components/ui/spinner";

export function ChatMessages() {
  const { msg, loading } = useChatContext();

  return (
    <div>
      {msg.map((m, i) => (
        <div
          key={i}
          className={`p-2 m-1 rounded-lg ${
            m.role === "user"
              ? "self-end bg-gray-300"
              : "self-start bg-gray-400"
          }`}
        >
          {m.content}
        </div>
      ))}

      {loading && (
        <div className="flex gap-2 items-center">
          <h3>Deep thinking...</h3>
          <Spinner />
        </div>
      )}
    </div>
  );
}
