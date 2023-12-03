import { useState } from "react";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_CHAT } from "../../api/chat.subscription";

interface Chat {
  text: string;
  createdAt: string;
}

const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  const updateChatHistory = (chat: Chat) => {
    setChatHistory((prev) => [...prev, chat]);
  };

  useSubscription(SUBSCRIBE_CHAT, {
    onData: ({ data }) => {
      const chat = data?.data?.chat;
      if (!chat) return;

      updateChatHistory(chat);
    },
  });

  return {
    chatHistory,
  };
};

export default useChatHistory;
