import {View, StyleSheet, FlatList, Button} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Message} from '../models/Message';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {ChatMessage} from '../components/ChatMessages/ChatMessage';
import {
  listenToChatMessageUpdates,
  getNbrOfMessagesFromLastMessage,
  mapToChatMessageModel
} from '../services/ChatMessageService';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {StackParamList} from '../navigation/Navigation';
import {MessageInput} from '../components/ChatMessages/MessageInput';
import {
  DB_CHAT_MESSAGES_COLLECTION_NAME,
  DB_CHAT_ROOMS_COLLECTION_NAME,
  SCREEN_NAME_CHAT_ROOM
} from '../utils/globals';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const initialRun = useRef(true);
  const handleListener = useCallback(() => {
    if(messages)
  },[])
  // const [startAfter, setStartAfter] = useState<string>();

  const {user} = useContext(AuthenticationContext);
  const {
    params: {id: chatRoomId}
  } = useRoute<RouteProp<StackParamList, typeof SCREEN_NAME_CHAT_ROOM>>();

  useEffect(() => {
    if(!messages) {
      const listener = listenToChatMessageUpdates(chatRoomId, newMessages => {
        setMessages(newMessages);
        initialRun.current = false;
      });
    }


    return () => {
      listener;
    };

    // firestore()
    //   .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
    //   .doc(chatRoomId)
    //   .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
    //   .orderBy('createdAt', 'desc')
    //   .limit(1)
    //   .onSnapshot(snapshot => {
    //     const newMessages = snapshot.docs.map(doc => mapToChatMessageModel(doc));

    //     setMessages(prev => [...newMessages, ...prev]);
    //   });
  }, [messages.length<=0]);

  useEffect(() => {
    if (initialRun.current === false) {
      const listener = listenToChatMessageUpdates(
        chatRoomId,
        newMessages => {
          newMessages.length && setMessages(oldMessages => [...newMessages, ...oldMessages]);
        },
        messages[0].id
      );
      return () => {
        listener;
      };
    }
  }, [initialRun.current]);

  const loadOldMessages = async () => {
    console.log('donget');
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
              <ChatMessage message={item} isCurrentUser={user?.uid === item.userId} />
            )}
            keyExtractor={item => item.id!}
            onEndReached={() => console.log('end reached')}
            inverted
            onEndReachedThreshold={0.95}
          />
        ) : (
          ''
        )}
      </View>
      <MessageInput roomId={chatRoomId} />
      {/* <Button
        onPress={() => {
          firestore()
            .collection(DB_CHAT_ROOMS_COLLECTION_NAME)
            .doc(chatRoomId)
            .collection(DB_CHAT_MESSAGES_COLLECTION_NAME)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot =>
              snapshot.docs.forEach(doc => console.log(doc.data().createdAt.toDate()))
            );
        }}
        title={messages.length.toString()}
      /> */}
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
