import { gql } from "@apollo/client";

export const SUBSCRIBE_CHAT = gql`
  subscription chat {
    chat {
      text
      createdAt
    }
  }
`;
