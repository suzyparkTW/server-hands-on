import { PubSub } from "graphql-subscriptions";

const CHAT_PUBSUB_TRIGGER = "CHAT";

export const typeDefs = `#graphql
  type Chat {
    text: String!
    createdAt: String!
  }

  type Query {
    chats: [Chat]
  }

  type Mutation {
    sendChat(text: String!, createdAt: String!): Chat
  }

  type SendChatResponse {
    chat: Chat!
  }

  type Subscription {
    chat: Chat!
  }
`;

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    chats: () => ({
      text: "Query sample text",
      createdAt: "2023-12-02T15:10:23.074Z",
    }),
  },
  Mutation: {
    sendChat(_, args) {
      const newChat = { text: args.text, createdAt: args.createdAt };

      pubsub.publish(CHAT_PUBSUB_TRIGGER, {
        chat: newChat,
      });

      return newChat;
    },
  },
  Subscription: {
    chat: {
      subscribe: () => pubsub.asyncIterator(CHAT_PUBSUB_TRIGGER),
    },
  },
};
