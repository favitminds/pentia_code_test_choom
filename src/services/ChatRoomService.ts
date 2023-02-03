import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {ChatRoom} from '../models/ChatRoom';
import {DB_CHAT_ROOMS_COLLECTION_NAME} from '../utils/globals';

export const getChatRooms = async () => {
  const data = await firestore()
    .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    .orderBy('updatedAt', 'desc')
    .get();

  return data.docs.map(doc => mapToChatRoomModel(doc));
};

export const updateEditTimeOfChatRoom = async (chatRoomId: string, updatedAt: Date) => {
  await firestore().collection(DB_CHAT_ROOMS_COLLECTION_NAME).doc(chatRoomId).update({updatedAt});
};

const mapToChatRoomModel = (
  firestoreDocument: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): ChatRoom => {
  const data = firestoreDocument.data();
  return {
    id: firestoreDocument.id,
    description: data.description,
    name: data.name,
    updatedAt: data.updatedAt.toDate()
  };
};
