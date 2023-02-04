import storage, {firebase} from '@react-native-firebase/storage';

export const sendImageToChatRoom = async (
  chatRoomId: string,
  fileName: string,
  filePath: string,
  callback: (fileUrl: string) => void
) => {
  const storageRef = firebase
    .app()
    .storage(STORAGE_FOLDER_PATH)
    .ref(`${STORAGE_CHAT_ROOM_PATH}/${chatRoomId}/${STORAGE_IMAGES_PATH}/${fileName}`);

  await storageRef.putFile(filePath).then(() => storageRef.getDownloadURL().then(callback));
};

const STORAGE_FOLDER_PATH = 'gs://pentia-code-test-choom.appspot.com';
const STORAGE_IMAGES_PATH = 'images';
const STORAGE_CHAT_ROOM_PATH = 'chat-rooms';
