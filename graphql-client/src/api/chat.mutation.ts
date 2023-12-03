import { gql } from "@apollo/client";

export const SEND_CHAT = gql`
  mutation sendChat($text: String!, $createdAt: String!) {
    sendChat(text: $text, createdAt: $createdAt) {
      text
      createdAt
    }
  }
`;
