import {RefreshControl, StyleSheet, View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {ChatRoomList} from '../components/ChatRoom/ChatRoomList';
import {ChatRoom as ChatRoomModel} from '../models/ChatRoom';
import {getChatRooms} from '../services/ChatRoomService';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../theme/colors';

export const ChatRoomsScreen = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomModel[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchChatRooms();
  }, [isFocused]);

  const fetchChatRooms = async () => {
    const rooms = await getChatRooms();
    setChatRooms(rooms);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Chat Rooms</Text>
      </View>
      <ChatRoomList onRefresh={fetchChatRooms} chatRooms={chatRooms} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.bg.primary,
    alignItems: 'center',
    rowGap: 20,
    height: '100%'
  },
  titleContainer: {
    marginTop: 20,
    color: colors.text.primary
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
