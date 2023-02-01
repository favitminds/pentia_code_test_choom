import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Message} from '../models/Message';
import {
  DB_CHAT_ROOMS_COLLECTION_NAME,
  DB_CHAT_MESSAGES_COLLECTION_NAME,
  MESSAGES_LIMIT,
  MESSAGES_UPDATE_LIMIT
} from '../utils/globals';

export const addChatMessageToChatRoom = async (chatRoomId: string, message: Message) => {
  await firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .add({
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
) => {
  firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy('createdAt', 'desc')
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
  let query = firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .doc(chatRoomId)
    .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    .orderBy('createdAt', 'desc');

  if (messageId) {
    query = query.startAfter(messageId);
  }
  const data = await query.limit(numberOfMessages).get();

  return data.docs.map(doc => mapToChatMessageModel(doc));
};

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
