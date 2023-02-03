import {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Message} from '../../models/Message';
import {AuthenticationContext} from '../../services/authentication/AuthenticationContext';
import {addChatMessageToChatRoom} from '../../services/ChatMessageService';
import {updateEditTimeOfChatRoom} from '../../services/ChatRoomService';

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
      <TextInput style={styles.messaginginput} onChangeText={setInput} value={input} />
      <Pressable style={styles.messagingbuttonContainer} onPress={sendChatMessage}>
        <View>
          <Text style={{color: 'black', fontSize: 20}}>SEND</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  messaginginputContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    color: 'black'
  },
  messagingbuttonContainer: {
    width: '30%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
});
