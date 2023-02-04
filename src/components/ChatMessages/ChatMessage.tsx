import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';

type Props = {
  avatarUrl: string;
  createdAt: Date;
  text: string;
  userName: string;
  isCurrentUser: boolean;
};

export const ChatMessage = ({avatarUrl, createdAt, text, userName, isCurrentUser}: Props) => {
  const formattedDate = `${createdAt.toLocaleTimeString()} - ${createdAt.toLocaleDateString()}`;
  return (
    <View>
      <View
        style={
          !isCurrentUser
            ? styles.messageWrapper
            : [styles.messageWrapper, styles.currentUserMessageWrapper]
        }>
        <View style={styles.messageContentWrapper}>
          {!isCurrentUser && (
            <Avatar
              source={{uri: avatarUrl}}
              rounded
              size={30}
              containerStyle={styles.messageAvatar}
            />
          )}
          <View style={styles.messageText}>
            <Text style={styles.userName}>{userName}</Text>
            <View
              style={
                !isCurrentUser
                  ? styles.message
                  : [styles.message, {backgroundColor: 'rgb(194, 243, 194)'}]
              }>
              <Text style={styles.text}>{text}</Text>
            </View>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  currentUserMessageWrapper: {
    alignItems: 'flex-end'
  },
  messageContentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '50%'
  },
  messageText: {flexDirection: 'column', flexShrink: 1, flex: 1},
  message: {
    backgroundColor: '#f5ccc2',
    padding: 10,
    borderRadius: 15,
    maxHeight: '100%',
    width: '100%'
  },
  messageAvatar: {
    marginRight: 5
  },
  userName: {
    color: 'black',
    fontSize: 15
  },
  text: {},
  date: {
    color: 'black',
    fontSize: 12
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
