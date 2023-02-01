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
  const route = useRoute<RouteProp<StackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();

  // useEffect(() => {
  //   const listener = listenToChatMessageUpdates(route.params.id, setMessages);
  //   return () => {
  //     listener;
  //   };
  // }, []);

  useEffect(() => {
    getMessages();
  }, []);

  console.log(messages[messages.length - 1]);

  const getMessages = async () => {
    let fetchedMessages = [] as Message[];
    console.log(messages[messages.length - 1]);

    if (messages.length > 0) {
      fetchedMessages = await getNbrOfMessagesFromLastMessage(
        route.params.id,
        messages[messages.length - 1].id
      );
    } else {
      fetchedMessages = await getNbrOfMessagesFromLastMessage(route.params.id);
    }
    setMessages(oldMessages => [...oldMessages, ...fetchedMessages]);
    console.log(messages[messages.length - 1]);
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
            onEndReached={getMessages}
          />
        ) : (
          ''
        )}
      </View>
      <MessageInput roomId={route.params.id} />
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
