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
    <ScrollView refreshControl={refreshControl}>
      {chatRooms.map(chatRoom => (
        <ChatRoom
          name={chatRoom.name}
          description={chatRoom.description}
          id={chatRoom.id}
          key={chatRoom.id}
        />
      ))}
    </ScrollView>
  );
};
