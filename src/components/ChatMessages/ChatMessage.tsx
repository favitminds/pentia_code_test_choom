import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Message} from '../../models/Message';

type Props = {
  message: Message;
  isCurrentUser: boolean;
};

export const ChatMessage = ({message, isCurrentUser}: Props) => {
  const formattedTime = `${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`;
  return (
    <View>
      <View
        style={
          !isCurrentUser
            ? styles.messageWrapper
            : [styles.messageWrapper, styles.currentUserMessageWrapper]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Ionicons name="person-circle-outline" size={30} color="black" style={styles.mavatar} /> */}
          <View
            style={
              !isCurrentUser
                ? styles.message
                : [styles.message, {backgroundColor: 'rgb(194, 243, 194)'}]
            }>
            <Text>{message.text}</Text>
          </View>
        </View>
        <Text style={{marginLeft: 40}}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 2
  },
  currentUserMessageWrapper: {
    alignItems: 'flex-end'
  },
  message: {
    maxWidth: '50%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 0
  },
  mvatar: {
    marginRight: 5
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
