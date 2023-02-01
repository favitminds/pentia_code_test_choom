import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Message} from '../models/Message';
import {useContext, useEffect, useState} from 'react';
import {ChatMessage} from '../components/ChatMessages/ChatMessage';
import {
  getNewestNbrOfMessages,
  listenToChatMessageUpdates,
  getNbrOfMessagesFromLastMessage
} from '../services/ChatMessageService';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {StackParamList} from '../navigation/Navigation';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {SCREEN_NAME_CHAT_ROOM} from '../utils/globals';

export const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageSent, setMessageSent] = useState(false);
  const {user} = useContext(AuthenticationContext);
  const {
    params: {id: chatRoomId}
  } = useRoute<RouteProp<StackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();

  useEffect(() => {
    getInitialMessages();
  }, [chatRoomId]);

  const getInitialMessages = async () => {
    const initialMessages = await getNewestNbrOfMessages(chatRoomId);
    setMessages(initialMessages);
  };

  useEffect(() => {
    if (messageSent) {
      const listener = listenToChatMessageUpdates(
        chatRoomId,
        newMessages => setMessages(oldMessages => [...newMessages, ...oldMessages]),
        messages[0].id!
      );
      return () => {
        listener;
      };
    }
  }, [messageSent]);

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
            inverted
            onEndReached={loadOldMessages}
          />
        ) : (
          ''
        )}
      </View>
      <MessageInput roomId={chatRoomId} onInputSubmitted={() => setMessageSent(true)} />
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
