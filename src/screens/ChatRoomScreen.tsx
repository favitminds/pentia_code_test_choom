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
import {AppStackParamList} from '../navigation/AppNavigator';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {SCREEN_NAME_CHAT_ROOM} from '../utils/globals';

export const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {user} = useContext(AuthenticationContext);
  const {
    params: {id: chatRoomId}
  } = useRoute<RouteProp<AppStackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();

  useEffect(() => {
    const listener = listenToChatMessageUpdates(chatRoomId, setMessages);
  }, [chatRoomId]);

  const loadOldMessages = async () => {
    const fetchedMessages = await getNbrOfMessagesFromLastMessage(
      chatRoomId,
      messages[messages.length - 1].id
    );
    setMessages(messages => [...messages, ...fetchedMessages]);
  };

  return (
    <View style={styles.messagingscreen}>
      <View style={styles.messagingscreen}>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <ChatMessage {...item} isCurrentUser={user?.uid === item.userId} />
            )}
            keyExtractor={item => item.id!}
            inverted
            onEndReachedThreshold={0.005}
            initialNumToRender={50}
            onEndReached={() => {
              console.log('END REACHED');
            }}
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
