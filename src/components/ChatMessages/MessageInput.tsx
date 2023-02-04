import {Icon} from '@rneui/themed';
import {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Message} from '../../models/Message';
import {AuthenticationContext} from '../../services/authentication/AuthenticationContext';
import {addChatMessageToChatRoom} from '../../services/ChatMessageService';
import {updateEditTimeOfChatRoom} from '../../services/ChatRoomService';
import {sendImageToChatRoom} from '../../services/ImageStorageService';
import {colors} from '../../theme/colors';

type Props = {
  roomId: string;
};

export const MessageInput = ({roomId}: Props) => {
  const [input, setInput] = useState<string>('');
  const {user} = useContext(AuthenticationContext);

  const sendChatMessage = async (imageUrl?: string) => {
    // Only submit if imageUrl or input is set
    if (!input && !imageUrl) {
      return;
    }
    const createdAt = new Date();
    const chatMessage: Message = {
      createdAt: createdAt,
      userId: user?.uid!,
      userName: user?.displayName!,
      avatarUrl: user?.photoURL!,
      text: ''
    };

    if (imageUrl) {
      chatMessage.isImage = true;
      chatMessage.text = imageUrl;
    } else {
      chatMessage.isImage = false;
      chatMessage.text = input;
    }

    await addChatMessageToChatRoom(roomId, chatMessage);
    await updateEditTimeOfChatRoom(roomId, createdAt);
    setInput('');
  };

  const onLaunchCamera = async () => {
    await launchCamera(
      {mediaType: 'photo', maxWidth: 120, maxHeight: 160, quality: 1, includeExtra: false},
      waitForImageUpload
    );
  };

  const onLaunchImageLibrary = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', maxWidth: 120, maxHeight: 160, quality: 1, includeExtra: false},
      waitForImageUpload
    );
  };

  const waitForImageUpload = async (response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode) {
      const {assets} = response;
      if (assets) {
        const {fileName, uri} = assets[0];
        if (fileName && uri) {
          await sendImageToChatRoom(roomId, fileName, uri, async fileUrl => {
            await sendChatMessage(fileUrl);
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="camera" iconStyle={styles.icon} style={styles.icon} onPress={onLaunchCamera} />
      <Icon
        name="image"
        iconStyle={styles.icon}
        style={styles.icon}
        onPress={onLaunchImageLibrary}
      />
      <TextInput style={styles.input} multiline onChangeText={setInput} value={input} />
      <Pressable style={styles.button} onPress={() => sendChatMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.bg.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    backgroundColor: colors.chatMessage.bg.currentUser,
    padding: 5,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    color: colors.text.primary
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.chatMessage.bg.currentUser,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 15
  },
  icon: {
    color: colors.text.primary,
    fontSize: 30,
    marginRight: 5
  }
});
