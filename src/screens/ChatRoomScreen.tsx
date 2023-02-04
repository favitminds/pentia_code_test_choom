import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Message} from '../models/Message';
import {ChatMessage} from '../components/ChatMessages/ChatMessage';
import {
  listenToChatMessageUpdates,
  getNbrOfMessagesFromLastMessage
} from '../services/ChatMessageService';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {AppStackParamList} from '../navigation/AppNavigator';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {SCREEN_NAME_CHAT_ROOM} from '../utils/globals';
import {colors} from '../theme/colors';

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
    <View style={styles.chatRoomScreen}>
      <View style={styles.messagingLayout}>
        <View style={styles.messagesLayout}>
          {messages.length ? (
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
    </View>
  );
};

export const styles = StyleSheet.create({
  chatRoomScreen: {
    flex: 1,
    backgroundColor: colors.bg.primary
  },
  messagingLayout: {
    flex: 1,
    paddingTop: 10
  },
  messagesLayout: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flex: 1
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
