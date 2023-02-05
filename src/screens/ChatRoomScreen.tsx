import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Message} from '../models/Message';
import {ChatMessage} from '../components/ChatMessages/ChatMessage';
import {
  getMessageFromChatRoom,
  listenToInitialChatMessageUpdates,
  listenToChatMessageUpdates,
  getNbrOfMessagesFromLastMessage
} from '../services/ChatMessageService';
import {AuthenticationContext} from '../context/authentication/AuthenticationContext';
import {AppStackParamList} from '../navigation/AppNavigator';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {MESSAGES_LIMIT, SCREEN_NAME_CHAT_ROOM} from '../utils/globals';
import {colors} from '../theme/colors';

export const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {user} = useContext(AuthenticationContext);
  const {
    params: {id: chatRoomId}
  } = useRoute<RouteProp<AppStackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();
  const [initialRun, setInitialRun] = useState(true);

  let messageSubscriber: (() => void) | null = null;

  /*
   2 listeners are needed. The first one is to get the initial messages from firestore, but at the 
   same time, the first listener should still listen, if no messages are present in firestore, and eventually show up.

   The second listener is added, so that only newer messages than the messages in the state, are fetched.
  */
  useEffect(() => {
    if (initialRun) {
      messageSubscriber = listenToInitialChatMessageUpdates(chatRoomId, newMessages => {
        if (newMessages.length) {
          setMessages(newMessages);
          setInitialRun(false);
        }
      });
    } else {
      getMessageFromChatRoom(chatRoomId, messages[0].id!, messageDocument => {
        messageSubscriber = listenToChatMessageUpdates(chatRoomId, messageDocument, newMessage => {
          newMessage && setMessages(oldMessages => [newMessage, ...oldMessages]);
        });
      });
    }

    return () => {
      if (messageSubscriber) {
        messageSubscriber();
      }
    };
  }, [initialRun]);

  const loadOldMessages = async () => {
    // Check is for not loading older messages as soon as the user enters the app, and only fetch older messages
    // if more messages than the "MESSAGES_LIMIT" are present.
    if (messages.length >= MESSAGES_LIMIT) {
      const fetchedMessages = await getNbrOfMessagesFromLastMessage(
        chatRoomId,
        messages[messages.length - 1].id!
      );
      if (fetchedMessages) {
        setMessages(messages => [...messages, ...fetchedMessages]);
      }
    }
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
              onEndReached={loadOldMessages}
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
