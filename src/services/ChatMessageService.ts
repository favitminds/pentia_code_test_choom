import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Message} from '../models/Message';
import {
  DB_CHAT_ROOMS_COLLECTION_NAME,
  DB_CHAT_MESSAGES_COLLECTION_NAME,
  MESSAGES_LIMIT,
  MESSAGES_UPDATE_LIMIT
} from '../utils/globals';

export const addChatMessageToChatRoom = async (chatRoomId: string, message: Message) => {
  await queryBuilder(chatRoomId).add({
    avatarUrl: message.avatarUrl,
    userName: message.userName,
    userId: message.userId,
    text: message.text,
    createdAt: message.createdAt
  });
};

export const listenToChatMessageUpdates = async (
  chatRoomId: string,
  callback: (messages: Message[]) => void
  // messageId: string
) => {
  // const messageMatch = await queryBuilder(chatRoomId).doc(messageId).get();

  queryBuilder(chatRoomId, FIELD_CREATED_AT, 'desc')
    // .endBefore(messageMatch)
    .limit(MESSAGES_UPDATE_LIMIT)
    .onSnapshot(snapshot => {
      const mappedMessages = snapshot.docs.map(doc => {
        const chatMessage = mapToChatMessageModel(doc);
        return chatMessage;
      });
      callback(mappedMessages);
    });
};

export const getNbrOfMessagesFromLastMessage = async (
  chatRoomId: string,
  messageId?: string,
  numberOfMessages = MESSAGES_LIMIT
) => {
  const messageMatch = await queryBuilder(chatRoomId).doc(messageId).get();

  const filteredMessagesDocuments = await queryBuilder(chatRoomId, FIELD_CREATED_AT, 'desc')
    .startAfter(messageMatch)
    .limit(numberOfMessages)
    .get();

  return filteredMessagesDocuments.docs.map(doc => mapToChatMessageModel(doc));
};

export const getNewestNbrOfMessages = async (
  chatRoomId: string,
  numberOfMessages = MESSAGES_LIMIT
) => {
  let messagesDocuments = await queryBuilder(chatRoomId, FIELD_CREATED_AT, 'desc')
    .limit(numberOfMessages)
    .get();

  return messagesDocuments.docs.map(doc => mapToChatMessageModel(doc));
};

const queryBuilder = (chatRoomId: string, orderBy?: string, order?: SORTING_ORDER) => {
  let query = firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME);

  if (orderBy && order) {
    query.orderBy(orderBy, order);
  }

  return query;
};

const FIELD_CREATED_AT = 'createdAt';
type SORTING_ORDER = 'asc' | 'desc';

const mapToChatMessageModel = (
  firestoreDocument: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): Message => {
  const data = firestoreDocument.data();
  return {
    id: firestoreDocument.id,
    avatarUrl: data.avatarUrl,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    userId: data.userId,
    userName: data.userName
  };
};

// INFO: Inspired by: https://www.crowdbotics.com/blog/add-real-time-database-to-react-native-app-with-firestore
