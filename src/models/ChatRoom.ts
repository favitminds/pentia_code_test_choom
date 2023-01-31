import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type ChatRoom = {
  // TODO: last edited, from firestore?
  // TODO: date created, from firestore?
  id: string;
  name: string;
  description: string;
};

export const mapToChatRoomModel = (
  firestoreDocument: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): ChatRoom => {
  return {
    id: firestoreDocument.id,
    description: firestoreDocument.data().description,
    name: firestoreDocument.data().name
  };
};
