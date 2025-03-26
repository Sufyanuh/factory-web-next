import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
    $token: String!
    $os: String
  ) {
    login(email: $email, password: $password, token: $token, os: $os) {
      user {
        id
        email
        username
        password
        role
        status
      }
      device {
        id
        userId
        token
      }
      token
      errors {
        message
      }
    }
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export const LOGOUT_DEVICE = gql`
  mutation Logout($userId: Int!, $deviceId: Int!) {
    logout(userId: $userId, deviceId: $deviceId) {
      error
      success
    }
  }
`;
export const CHANGE_PASSWORD_WITH_OTP = gql`
  mutation ChangePasswordWithOtp(
    $otp: Int!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    changePasswordWithOtp(
      otp: $otp
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;
export const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password: String!
    $inviteCode: String
  ) {
    register(
      email: $email
      username: $username
      password: $password
      inviteCode: $inviteCode
    ) {
      device {
        id
        userId
        token
      }
      errors {
        path
        message
      }
      token
    }
  }
`;
export const LIKE_DISLIKE = gql`
  mutation LikeDislike($postId: Int!, $userId: Int!) {
    likeDislike(postId: $postId, userId: $userId) {
      error
      success
    }
  }
`;
export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $postId: Int!
    $userId: Int!
    $username: String!
    $commentId: Int
    $body: String
    $imageUrl: String
  ) {
    createComment(
      postId: $postId
      userId: $userId
      username: $username
      commentId: $commentId
      body: $body
      imageUrl: $imageUrl
    ) {
      uuid
    }
  }
`;
export const CREATE_POST = gql`
  mutation createPost(
    $authorId: Int!
    $title: String
    $body: String
    $tagged: [Int]
    $tagEveryone: Boolean
    $attachments: [AttachmentsInputType]
    $groupId: Int
  ) {
    createPost(
      authorId: $authorId
      title: $title
      body: $body
      tagged: $tagged
      TagEveryone: $tagEveryone
      attachments: $attachments
      groupId: $groupId
    ) {
      approval
    }
  }
`;
export const REMOVE_FRIENDS = gql`
  mutation RemoveFreind($userId: Int!, $friendId: Int!) {
    removeFreind(userId: $userId, friendId: $friendId) {
      updatedAt
    }
  }
`;
export const ADD_FRIENDS = gql`
  mutation SendRequest($friendId: Int!) {
    sendRequest(friendId: $friendId) {
      uuid
    }
  }
`;
export const CANCEL_REQUESTS = gql`
  mutation CancelRequest($friendId: Int!) {
    cancelRequest(friendId: $friendId) {
      uuid
    }
  }
`;
export const ADD_STREAM_COMMENTS = gql`
  mutation AddStreamComment($streamId: Int!, $comment: String!, $userId: Int!) {
    addStreamComment(streamId: $streamId, comment: $comment, userId: $userId) {
      id
    }
  }
`;
export const SEND_MESSAGE = gql`
  mutation CreateMessage(
    $senderId: Int!
    $message: String
    $attachmentUrl: String
    $attachmentType: String
    $receiverId: Int
    $chatId: Int
  ) {
    createMessage(
      senderId: $senderId
      message: $message
      attachmentUrl: $attachmentUrl
      attachmentType: $attachmentType
      receiverId: $receiverId
      chatId: $chatId
    ) {
      id
    }
  }
`;
export const SEND_GROUP_MESSAGE = gql`
  mutation SendGroupMessage(
    $senderId: Int!
    $groupId: Int!
    $message: String
    $attachmentUrl: String
    $attachmentType: String
  ) {
    sendGroupMessage(
      senderId: $senderId
      groupId: $groupId
      message: $message
      attachmentUrl: $attachmentUrl
      attachmentType: $attachmentType
    ) {
      id
      message
      senderId
      createdAt
      sender {
        username
        profile {
          imageUrl
        }
      }
    }
  }
`;
export const MARK_READ_NOTIFICATIONS = gql`
  mutation MarkReadNotification($notificationId: Int!) {
    markReadNotification(notificationId: $notificationId)
  }
`;
export const MARK_READ_ALL_MESSAGES = gql`
  mutation MarkReadAllMessagesInChat($chatId: Int!) {
    markReadAllMessagesInChat(chatId: $chatId)
  }
`;
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $phoneNumber: String!
    $bio: String
    $address: address
    $dateOfBirth: String
    $username: String
    $userId: Int!
    $imageUrl: String
  ) {
    updateProfile(
      phoneNumber: $phoneNumber
      bio: $bio
      address: $address
      dateOfBirth: $dateOfBirth
      username: $username
      userId: $userId
      imageUrl: $imageUrl
    ) {
      id
      userId
      imageUrl
      bio
      street
      address
      zip
      city
      state
      country
      phoneNumber
      dateOfBirth
    }
  }
`;


export const CREATE_TOPIC = gql`
  mutation CreateTopic($name: String!, $groupId: Int!) {
    createTopic(name: $name, groupId: $groupId) {
      id
      groupId
      name
      posts {
        id
        uuid
        title
        body
        username
        User {
          id
          username
          profile {
            imageUrl
          }
        }
        authorId
        createdAt
        comments {
          id
          body
          username
          postId
          uuid
          createdAt
          userId
        }
        likes {
          postId
          userId
          user {
            username
            profile {
              imageUrl
            }
          }
        }
        attachments {
          id
          url
          postId
          type
        }
      }
    }
  }
`

export const EDIT_TOPIC = gql`
  mutation EditTopic($name: String!, $topicId: Int!) {
    editTopic(name: $name, topicId: $topicId) {
      id
      groupId
      name
      posts {
        id
        uuid
        title
        body
        username
        User {
          id
          username
          profile {
            imageUrl
          }
        }
        authorId
        createdAt
        comments {
          id
          body
          username
          postId
          uuid
          createdAt
          userId
        }
        likes {
          postId
          userId
          user {
            username
            profile {
              imageUrl
            }
          }
        }
        attachments {
          id
          url
          postId
          type
        }
      }
    }
  }
`

export const ASSIGN_TOPIC = gql`
  mutation AssignTopic($postId: Int!, $topicId: Int!) {
    assignTopic(postId: $postId, topicId: $topicId) {
      id
      groupId
      name
      posts {
        id
        uuid
        title
        body
        username
        User {
          id
          username
          profile {
            imageUrl
          }
        }
        authorId
        createdAt
        comments {
          id
          body
          username
          postId
          uuid
          createdAt
          userId
        }
        likes {
          postId
          userId
          user {
            username
            profile {
              imageUrl
            }
          }
        }
        attachments {
          id
          url
          postId
          type
        }
      }
    }
  }
`

export const REMOVE_TOPIC = gql`
  mutation RemoveTopic($postId: Int!, $topicId: Int!) {
    removeTopic(postId: $postId, topicId: $topicId) {
      id
      groupId
      name
      posts {
        id
        uuid
        title
        body
        username
        User {
          id
          username
          profile {
            imageUrl
          }
        }
        authorId
        createdAt
        comments {
          id
          body
          username
          postId
          uuid
          createdAt
          userId
        }
        likes {
          postId
          userId
          user {
            username
            profile {
              imageUrl
            }
          }
        }
        attachments {
          id
          url
          postId
          type
        }
      }
    }
  }
`

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($topicId: Int!) {
    deleteTopic(topicId: $topicId)
  }
`
