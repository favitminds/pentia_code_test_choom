import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Message} from '../models/Message';
import {useContext, useEffect, useState} from 'react';
import {ChatMessage} from '../components/ChatMessages/ChatMessage';
import {
  listenToChatMessageUpdates,
  getNbrOfMessagesFromLastMessage
} from '../services/ChatMessageService';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {StackParamList} from '../navigation/Navigation';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {SCREEN_NAME_CHAT_ROOM} from '../utils/globals';

export const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {user} = useContext(AuthenticationContext);
  const {
    params: {id: chatRoomId}
  } = useRoute<RouteProp<StackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();

  useEffect(() => {
    if (messages.length <= 0) {
      listenToChatMessageUpdates(chatRoomId, newMessages => {
        setMessages(newMessages);
      });
    } else {
      listenToChatMessageUpdates(
        chatRoomId,
        newMessages => {
          setMessages(oldMessages => [...newMessages, ...oldMessages]);
        },
        messages[0].id
      );
    }
  }, []);

  const loadOldMessages = async () => {
    const fetchedMessages = await getNbrOfMessagesFromLastMessage(
      chatRoomId,
      messages[messages.length - 1].id
    );
    setMessages(oldMessages => [...oldMessages, ...fetchedMessages]);
  };

  return (
    <View style={styles.messagingscreen}>
      <View style={styles.messagingscreen}>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <ChatMessage message={item} isCurrentUser={user?.uid === item.userId} />
            )}
            keyExtractor={item => item.id!}
            onEndReached={loadOldMessages}
            inverted
          />
        ) : (
          ''
        )}
      </View>
      <MessageInput roomId={chatRoomId} />
    </View>
  );
};

export const styles = StyleSheet.create({
  messagingscreen: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
