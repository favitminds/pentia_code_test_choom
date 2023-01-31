import firestore from '@react-native-firebase/firestore';
import {mapToChatRoomModel} from '../models/ChatRoom';
import {DB_CHAT_ROOMS_COLLECTION_NAME} from '../utils/globals';

export const getChatRooms = async () => {
  const data = await firestore().collection(DB_CHAT_ROOMS_COLLECTION_NAME).get();

  return data.docs.map(doc => mapToChatRoomModel(doc));
};
