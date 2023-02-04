import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Message} from '../models/Message';
import {
  DB_CHAT_ROOMS_COLLECTION_NAME,
  DB_CHAT_MESSAGES_COLLECTION_NAME,
  MESSAGES_LIMIT
} from '../utils/globals';

export const addChatMessageToChatRoom = async (chatRoomId: string, message: Message) => {
  await queryBuilder(chatRoomId).add({
    avatarUrl: message.avatarUrl,
    userName: message.userName,
    userId: message.userId,
    text: message.text,
    createdAt: message.createdAt,
    isImage: message.isImage
  });
};

export const listenToChatMessageUpdates = async (
  chatRoomId: string,
  callback: (messages: Message[]) => void,
  messageId?: string
) => {
  const query = firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy(FIELD_CREATED_AT, 'desc');
  if (messageId) {
    const messageMatch = await queryBuilder(chatRoomId).doc(messageId).get();
    query.endBefore(messageMatch);
  }
  query.limit(MESSAGES_LIMIT);

  return query.onSnapshot(snapshot => {
    const mappedMessages = snapshot.docs.map(mapToChatMessageModel);

    callback(mappedMessages);
  });
};

export const getNbrOfMessagesFromLastMessage = async (
  chatRoomId: string,
  messageId?: string,
  numberOfMessages = MESSAGES_LIMIT
) => {
  const messageMatch = await queryBuilder(chatRoomId).doc(messageId).get();

  const filteredMessagesDocuments = await firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy(FIELD_CREATED_AT, 'desc')
    .startAfter(messageMatch)
    .limit(numberOfMessages)
    .get();

  return filteredMessagesDocuments.docs.map(mapToChatMessageModel);
};

const queryBuilder = (chatRoomId: string) =>
  firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME);

const FIELD_CREATED_AT = 'createdAt';

export const mapToChatMessageModel = (
  firestoreDocument: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): Message => {
  const data = firestoreDocument.data();
  return {
    id: firestoreDocument.id,
    avatarUrl: data.avatarUrl,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    userId: data.userId,
    userName: data.userName,
    isImage: data.isImage
  };
};

// INFO: Inspired by: https://www.crowdbotics.com/blog/add-real-time-database-to-react-native-app-with-firestore
