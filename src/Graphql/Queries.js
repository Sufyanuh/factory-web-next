import { gql } from "@apollo/client";

export const NEWS_FEED_POSTS = gql`
  query NewsfeedPosts($offset: Int, $take: Int) {
    newsfeedPosts(offset: $offset, take: $take) {
      id
      uuid
      title
      body
      username
      User {
        profile {
          imageUrl
          id
        }
        id
        username
      }
      createdAt
      type
      comments {
        id
        body
        username
        reply {
          id
          body
          imageUrl
          username
          createdAt
          isliked
          user {
            username
            profile {
              imageUrl
            }
          }
        }
        user {
          profile {
            imageUrl
          }
          username
        }
        userId
        imageUrl
        createdAt
        isliked
        likedBy {
          id
          username
        }
        likeCount
      }
      isCommenting
      likeCount
      commentCount
      isLiked
      group {
        id
        name
      }
      attachments {
        id
        url
        type
      }
    }
  }
`;
export const USER_CURRENT = gql`
  query CurrentUser {
    currentUser {
      id
      email
      username
      password
      role
      status
      friendCount
      profile {
        imageUrl
        bio
        street
        address
        city
        state
        zip
        country
        phoneNumber
        dateOfBirth
      }
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query User($userId: Int!) {
    user(userId: $userId) {
      id
      username
      friendCount
      mutualFriendsCount
      isFriend
      profile {
        address
        bio
        city
        country
        dateOfBirth
        id
        imageUrl
        phoneNumber
        state
        street
        userId
      }
    }
  }
`;
export const CATEGORIES = gql`
  query GroupCategories {
    groupCategories {
      id
      name
    }
  }
`;
export const CATEGORIZED_PRODUCTS = gql`
  query CategorizedProducts($offset: Int, $take: Int) {
    categorizedProducts(offset: $offset, take: $take) {
      id
      name
      products {
        category {
          id
          name
        }
        condition
        deliveryOption
        description
        group {
          id
          name
        }
        id
        isSold
        owner {
          id
          profile {
            imageUrl
          }
          username
        }
        price
        productImages {
          url
          id
        }
        status
        title
        type
      }
    }
  }
`;
export const GET_PRODUCT_FILTER = gql`
  query GetProducts(
    $search: String
    $categoryId: Int
    $offset: Int
    $take: Int
  ) {
    getProducts(
      search: $search
      categoryId: $categoryId
      offset: $offset
      take: $take
    ) {
      category {
        id
        name
      }
      condition
      deliveryOption
      description
      group {
        id
        name
      }
      id
      isSold
      owner {
        id
        profile {
          imageUrl
        }
        username
      }
      price
      productImages {
        url
        id
      }
      status
      title
      type
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: Int!) {
    getProductById(productId: $productId) {
      category {
        id
        name
      }
      condition
      deliveryOption
      description
      createdAt
      group {
        id
        name
      }
      id
      isSold
      owner {
        id
        profile {
          imageUrl
        }
        username
      }
      price
      productImages {
        url
        id
      }
      status
      title
      type
    }
  }
`;
export const GET_MY_FIRENDS = gql`
  query GetMyFriends($userId: Int!) {
    getMyFriends(userId: $userId) {
      profile {
        imageUrl
      }
      username
      id
      mutualFriendsCount
      friendCount
    }
  }
`;
export const GET_ALL_SEARCHED_USER = gql`
  query SearchUsersByText($text: String!) {
    searchUsersByText(text: $text) {
      id
      username
      isFriend
      profile {
        imageUrl
        id
      }
      mutualFriendsCount
    }
  }
`;
export const GET_USERS_POSTS_BY_ID = gql`
  query GetPostsByUserId($offset: Int, $take: Int, $userId: Int) {
    getPostsByUserId(offset: $offset, take: $take, userId: $userId) {
      id
      likeCount
      body
      title
      commentCount
      attachments {
        id
        type
        url
      }
    }
  }
`;
export const GET_USERS_POST_BY_ID = gql`
  query GetPostById($postId: Int!) {
    getPostById(postId: $postId) {
      id
      createdAt
      isLiked
      likeCount
      body
      title
      commentCount
      User {
        username
        profile {
          imageUrl
        }
      }
      attachments {
        id
        type
        url
      }
      comments {
        body
        id
        username
        imageUrl
        user {
          profile {
            imageUrl
          }
        }
      }
    }
  }
`;
export const GALLERY_ITEMS = gql`
  query GalleryItems($offset: Int, $take: Int, $userId: Int!) {
    galleryItems(offset: $offset, take: $take, userId: $userId) {
      id
      postId
      type
      url
      Post {
        createdAt
        likeCount
        commentCount
        comments {
          body
          username
          imageUrl
          user {
            profile {
              imageUrl
              id
            }
          }
        }
      }
    }
  }
`;
export const GET_MY_NOTIFICATIONS = gql`
  query GetMyNotifications($offset: Int, $take: Int) {
    getMyNotifications(offset: $offset, take: $take) {
      createdAt
      id
      isUnread
      postId
      readAt
      type
      title
      receiverId
      senderId
      receiver {
        username
        profile {
          imageUrl
          userId
        }
      }
      sender {
        username
        profile {
          imageUrl
          userId
        }
      }
    }
  }
`;
export const CATEGORIZED_SCHEDULED_SHOWS = gql`
  query CategorizedScheduledShows($offset: Int, $take: Int) {
    categorizedScheduledShows(offset: $offset, take: $take) {
      id
      name
      scheduledStreams {
        isStarted
        id
        title
        media
        mediaType
        date
        time
        user {
          username
          profile {
            imageUrl
          }
        }
      }
    }
  }
`;
export const CATEGORIZED_SCHEDULED_SHOWS_BY_ID = gql`
  query CategoryShows($categoryId: Int!) {
    categoryShows(categoryId: $categoryId) {
      scheduledStreams {
        isStarted
        id
        title
        media
        mediaType
        date
        time
        user {
          username
          profile {
            imageUrl
          }
        }
      }
    }
  }
`;
export const GET_SCHEDULED_STREAM_BY_ID = gql`
  query GetScheduleStreamById($streamId: Int!) {
    getScheduleStreamById(streamId: $streamId) {
      isStarted
      id
      title
      media
      mediaType
      date
      time
      user {
        username
        profile {
          imageUrl
        }
      }
    }
  }
`;
export const GET_STREAM_COMMENT = gql`
  query GetStreamComments($streamId: Int!, $offset: Int, $take: Int) {
    getStreamComments(streamId: $streamId, offset: $offset, take: $take) {
      userId
      comment
      id
      user {
        username
        profile {
          imageUrl
        }
      }
    }
  }
`;
export const GET_STREAM_PRODUCT = gql`
  query GetStreamsProducts($streamId: Int!) {
    getStreamsProducts(streamId: $streamId) {
      id
      price
      title
      type
      status
      description
      productImages {
        id
        url
      }
    }
  }
`;
export const GET_CHAT_MEMBER = gql`
  query GetChatMembers($userId: Int!, $offset: Int, $take: Int) {
    getChatMembers(userId: $userId, offset: $offset, take: $take) {
      unreadMessagesCount
      lastMessage {
        message
        createdAt
        senderId
      }
      id
      members {
        id
        userId
        chatId
        user {
          id
          username
          profile {
            imageUrl
          }
        }
      }
    }
  }
`;
export const GET_USER_CONVERSATIONS = gql`
  query GetMyConversations(
    $chatId: Int
    $offset: Int
    $senderId: Int
    $receiverId: Int
  ) {
    getMyConversations(
      chatId: $chatId
      offset: $offset
      senderId: $senderId
      receiverId: $receiverId
    ) {
      id
      message
      senderId
      createdAt
      attachmentUrl
      attachmentType
      isAttachment
      sender {
        id
        userId
        user {
          id
          username
          profile {
            imageUrl
          }
        }
      }
    }
  }
`;
export const GET_CONVERSATION_RECEIVER = gql`
  query Query($userId: Int!) {
    user(userId: $userId) {
      id
      username
      profile {
        id
        bio
        imageUrl
      }
    }
  }
`;
export const NOT_CHATED_USERS = gql`
  query NotChated($userId: Int!, $username: String) {
    notChated(userId: $userId, username: $username) {
      id
      uuid
      email
      username
      password
      role
      createdAt
      updatedAt
      profile {
        imageUrl
      }
    }
  }
`;
export const GET_CHAT_GROUP = gql`
  query GroupChats($userId: Int!) {
    groupChats(userId: $userId) {
      id
      name
      thumbnail
      lastMessage {
        senderId
        id
        message
        createdAt
        sender {
          username
        }
        groupId
        group {
          uuid
        }
      }
    }
  }
`;
export const GET_GROUP_MESSAGES = gql`
  query GetGroupMessages($groupId: Int!) {
    getGroupMessages(groupId: $groupId) {
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
export const GET_GROUP_BY_ID = gql`
  query Group($groupId: Int!) {
    group(groupId: $groupId) {
      thumbnail
      name
      memberCount
      ownerId
      owner {
        username
        profile {
          imageUrl
        }
      }
      members {
        isModerator
        isApproved
        userId
        user {
          friendCount
          username
          profile {
            imageUrl
          }
        }
      }
      posts {
        id
        uuid
        title
        body
        username
        User {
          profile {
            imageUrl
            id
          }
          id
          username
        }
        createdAt
        type
        comments {
          id
          body
          username
          reply {
            id
            body
            imageUrl
            username
            createdAt
            isliked
            user {
              username
              profile {
                imageUrl
              }
            }
          }
          user {
            profile {
              imageUrl
            }
            username
          }
          userId
          imageUrl
          createdAt
          isliked
          likedBy {
            id
            username
          }
          likeCount
        }
        isCommenting
        likeCount
        commentCount
        isLiked
        group {
          id
          name
        }
        attachments {
          id
          url
          type
        }
      }
    }
  }
`;
export const GET_ALL_GROUP_CATEGORY = gql`
  query AllGroup {
    groupCategories {
      id
      name
      description
      imageUrl
    }
  }
`;
export const GET_CATEGORIES_GROUPS = gql`
  query GroupCategories(
    $search: String
    $take: Int
    $offset: Int
    $onlyMyGroups: Boolean
  ) {
    groupCategories {
      id
      name
      groups(
        take: $take
        offset: $offset
        search: $search
        onlyMyGroups: $onlyMyGroups
      ) {
        id
        categoryId
        name
        description
        thumbnail
        ownerId
        memberCount
        visibility
        members {
          userId
        }
        category {
          id
        }
      }
    }
  }
`;
export const GET_ALL_GROUPS = gql`
  query Groups {
    groups {
      id
      thumbnail
      name
      memberCount
      visibility
      ownerId
      owner {
        username
        profile {
          imageUrl
        }
      }
      members {
        isModerator
        isApproved
        userId
        user {
          username
          profile {
            imageUrl
          }
        }
      }
      posts {
        id
        uuid
        title
        body
        username
        User {
          profile {
            imageUrl
            id
          }
          id
          username
        }
        createdAt
        type

        comments {
          id
          body
          username
          reply {
            id
            body
            imageUrl
            username
            createdAt
            isliked
            user {
              username
              profile {
                imageUrl
              }
            }
          }
          user {
            friendCount
            profile {
              imageUrl
            }
            username
          }
          userId
          imageUrl
          createdAt
          isliked
          likedBy {
            id
            username
          }
          likeCount
        }
        isCommenting
        likeCount
        commentCount
        isLiked
        group {
          id
          name
        }
        attachments {
          id
          url
          type
        }
      }
    }
  }
`;
export const GET_MY_PURCHASE = gql`
  query GetPurchases(
    $offset: Int
    $take: Int
    $startDate: String
    $endDate: String
    $showAll: Boolean = true
  ) {
    getPurchases(
      offset: $offset
      take: $take
      startDate: $startDate
      endDate: $endDate
      showAll: $showAll
    ) {
      id
      userId
      productId
      stripePaymentMethodId
      isCancelled
      payment {
        id
        amount
      }
      product {
        id
        title
        condition
        price
        description
        ownerId
        groupId
        type
        status
        productImages {
          id
          url
        }
      }
    }
  }
`

export const GET_MY_SALES = gql`
  query GetSales(
    $offset: Int
    $take: Int
    $startDate: String
    $endDate: String
    $showAll: Boolean = true
  ) {
    getSales(
      offset: $offset
      take: $take
      startDate: $startDate
      endDate: $endDate
      showAll: $showAll
    ) {
      id
      userId
      productId
      stripePaymentMethodId
      isCancelled
      product {
        id
        title
        condition
        price
        description
        ownerId
        groupId
        type
        status
        productImages {
          id
          url
        }
      }
    }
  }
`

export const GET_ALL_TOPICS = gql`
  query GetAllTopics($groupId: Int!) {
    getAllTopics(groupId: $groupId) {
      id
      name
      postCount
      groupId
      posts {
        id
        uuid
        title
        body
        username
        group {
          id
          name
          thumbnail
          ownerId
        }
        User {
          id
          username
          profile {
            imageUrl
          }
        }
        authorId
        createdAt
        isPinned
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
        isCommenting
      }
    }
  }
`