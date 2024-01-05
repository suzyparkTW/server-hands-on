import { useState } from "react";
import { trpc } from "../../utils/trpc";

interface Chat {
  text: string;
  createdAt: string;
}

const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  const updateChatHistory = (chat: Chat) => {
    setChatHistory((prev) => [...prev, chat]);
  };

  trpc.onSendChat.useSubscription(undefined, {
    onData: (data) => {
      const chat = data;
      if (!chat) return;

      updateChatHistory(chat);
    },
  });

  const missionList = trpc.missionList.useQuery()

  return {
    chatHistory,
    missionList
  };
};

export default useChatHistory;
