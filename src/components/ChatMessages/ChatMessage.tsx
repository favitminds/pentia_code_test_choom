import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';

type Props = {
  avatarUrl: string;
  createdAt: Date;
  text: string;
  isCurrentUser: boolean;
};

export const ChatMessage = ({avatarUrl, createdAt, text, isCurrentUser}: Props) => {
  const formattedDate = `${createdAt.toLocaleTimeString()} - ${createdAt.toLocaleDateString()}`;
  return (
    <View>
      <View
        style={
          !isCurrentUser
            ? styles.messageWrapper
            : [styles.messageWrapper, styles.currentUserMessageWrapper]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isCurrentUser && (
            <Avatar
              source={{uri: avatarUrl}}
              rounded
              size={30}
              containerStyle={styles.messageAvatar}
            />
          )}
          <View
            style={
              !isCurrentUser
                ? styles.message
                : [styles.message, {backgroundColor: 'rgb(194, 243, 194)'}]
            }>
            <Text>{text}</Text>
          </View>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
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
  messageAvatar: {
    marginRight: 10
  },
  date: {
    color: 'black'
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
