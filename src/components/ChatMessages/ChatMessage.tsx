import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';
import {colors} from '../../theme/colors';

type Props = {
  avatarUrl: string;
  createdAt: Date;
  text: string;
  userName: string;
  isCurrentUser: boolean;
  isImage?: boolean;
};

export const ChatMessage = ({
  avatarUrl,
  createdAt,
  text,
  userName,
  isCurrentUser,
  isImage
}: Props) => {
  const formattedDate = `${createdAt.toLocaleTimeString()} - ${createdAt.toLocaleDateString()}`;
  console.log(isImage);

  return (
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
          {!isCurrentUser && <Text style={styles.userName}>{userName}</Text>}
          <View
            style={!isCurrentUser ? styles.message : [styles.message, styles.currentUserMessage]}>
            {isImage ? (
              <Image style={styles.image} source={{uri: text}} />
            ) : (
              <Text style={styles.text}>{text}</Text>
            )}
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'column',
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
  messageText: {
    flexDirection: 'column',
    flex: 1
  },
  message: {
    backgroundColor: colors.chatMessage.bg.otherUsers,
    padding: 10,
    borderRadius: 15,
    flexShrink: 1
  },
  currentUserMessage: {
    backgroundColor: colors.chatMessage.bg.currentUser
  },
  messageAvatar: {
    marginRight: 5
  },
  userName: {
    color: colors.text.primary,
    fontSize: 15
  },
  text: {
    color: colors.text.primary
  },
  date: {
    color: colors.text.primary,
    fontSize: 12
  },
  image: {
    width: 120,
    height: 160
  }
});

// INFO: Inspired by: https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
