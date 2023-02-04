import {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl, View} from 'react-native';
import {ChatRoom as ChatRoomModel} from '../../models/ChatRoom';
import {ChatRoom} from './ChatRoom';

type Props = {
  chatRooms: ChatRoomModel[];
  onRefresh: () => void;
};

export const ChatRoomList = ({chatRooms, onRefresh}: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const refreshControl = <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />;

  return (
    <ScrollView refreshControl={refreshControl} style={styles.container}>
      {chatRooms.map(chatRoom => (
        <ChatRoom {...chatRoom} key={chatRoom.id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    paddingBottom: 20
  }
});
