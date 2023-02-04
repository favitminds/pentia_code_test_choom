import {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Message} from '../../models/Message';
import {AuthenticationContext} from '../../services/authentication/AuthenticationContext';
import {addChatMessageToChatRoom} from '../../services/ChatMessageService';
import {updateEditTimeOfChatRoom} from '../../services/ChatRoomService';
import {colors} from '../../theme/colors';

type Props = {
  roomId: string;
};

export const MessageInput = ({roomId}: Props) => {
  const [input, setInput] = useState<string>('');
  const {user} = useContext(AuthenticationContext);

  const sendChatMessage = async () => {
    // only submit if message exists
    if (!input) return;

    const editedAt = new Date();

    const chatMessage: Message = {
      createdAt: editedAt,
      userId: user?.uid!,
      userName: user?.displayName!,
      avatarUrl: user?.photoURL!,
      text: input
    };

    await addChatMessageToChatRoom(roomId, chatMessage);
    await updateEditTimeOfChatRoom(roomId, editedAt);
    setInput('');
  };

  return (
    <View style={styles.messaginginputContainer}>
      <TextInput style={styles.messaginginput} multiline onChangeText={setInput} value={input} />
      <Pressable style={styles.messagingbuttonContainer} onPress={sendChatMessage}>
        <View>
          <Text style={styles.buttonText}>Send</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  messaginginputContainer: {
    width: '100%',
    backgroundColor: colors.bg.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  messaginginput: {
    backgroundColor: colors.chatMessage.bg.currentUser,
    padding: 5,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    color: colors.text.primary
  },
  messagingbuttonContainer: {
    width: '20%',
    backgroundColor: colors.chatMessage.bg.currentUser,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 15
  }
});
