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

export const listenToChatMessageUpdates = (
  chatRoomId: string,
  messageDocument: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  callback: (newMessage: Message) => void
) => {
  return firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy(FIELD_CREATED_AT, 'desc')
    .endBefore(messageDocument)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          callback(mapToChatMessageModel(change.doc));
        }
      });
    });
};

export const getMessageFromChatRoom = async (
  chatRoomId: string,
  messageId: string,
  callback: (
    messageDocument: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) => void
) => {
  callback(await queryBuilder(chatRoomId).doc(messageId).get());
};

export const listenToInitialChatMessageUpdates = (
  chatRoomId: string,
  callback: (messages: Message[]) => void
) => {
  return firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy(FIELD_CREATED_AT, 'desc')
    .limit(MESSAGES_LIMIT)
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
  messageId: string,
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
