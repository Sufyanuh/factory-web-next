import { gql } from "@apollo/client";

export const NEW_GROUP_MESSAGE = gql`
  subscription GroupMessageCreated($groupId: Int!) {
    groupMessageCreated(groupId: $groupId) {
      id
      senderId
      groupId
      message
      createdAt
      attachmentUrl
      attachmentType
      isAttachment
      sender {
        username
        profile {
          imageUrl
        }
      }
      group {
        uuid
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription MessageCreated($chatId: Int!) {
    messageCreated(chatId: $chatId) {
      id
      message
      senderId
      chatId
      createdAt
      attachmentUrl
      attachmentType
      isAttachment
      sender {
        userId
        user {
          username
          profile {
            imageUrl
          }
          id
        }
        id
      }
    }
  }
`;
export const ROOM_SUBSCRIBE = gql`
  subscription MessageRoom($userId: Int!) {
    messageRoom(userId: $userId) {
      id
      receiver {
        id
        userId
      }
      lastMessage {
        message
      }
    }
  }
`;
