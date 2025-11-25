"use client";
import { useChatContext } from "@/context/ChatContent";
import { Spinner } from "@/components/ui/spinner";

export function ChatMessages() {
  const { msgs, loading } = useChatContext();

  return (
    <div className=" w-full flex flex-col p-4">
      {msgs.map((m, i) => (
        <div
          key={i}
          className={`p-2 m-1 flex rounded-lg max-w-fit ${
            m.role === "user"
              ? "self-end bg-gray-300"
              : "self-start bg-gray-400"
          }`}
        >
          {m.content}
        </div>
      ))}

      {loading && (
        <div className="flex items-center gap-2 self-start">
          <h3>Deep thinking...</h3>
          <Spinner />
        </div>
      )}
    </div>
  );
}
