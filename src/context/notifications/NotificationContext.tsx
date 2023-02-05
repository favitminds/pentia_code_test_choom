import React, {useState, createContext, useContext} from 'react';
import {
  checkIfChannelExists,
  onDisplayNotification
} from '../../notifications/NotificationController';
import {listenToMessageUpdates} from '../../services/ChatMessageService';
import {AuthenticationContext} from '../authentication/AuthenticationContext';

interface INotifcationsContext {
  listenToChatRoom: (chatRoomId: string, chatRoomName: string) => void;
}

type Props = {
  children: React.ReactNode;
};

export const NotificationContext = createContext<INotifcationsContext>({
  listenToChatRoom() {}
});

type ChatRoomInformation = {
  chatRoomId: string;
  chatRoomName: string;
};

export const NotificationContextProvider = ({children}: Props) => {
  const [chatRoomIds, setChatRoomIds] = useState<ChatRoomInformation[]>([]);
  const [chatRoomSnapShots, setChatRoomSnapShots] = useState<(() => void)[]>([]);
  const {user} = useContext(AuthenticationContext);

  const listenToChatRoom = async (chatRoomId: string, chatRoomName: string) => {
    setChatRoomIds(oldIds => [{chatRoomId, chatRoomName}, ...oldIds]);
    const channelId = await checkIfChannelExists(chatRoomId, user?.uid!, chatRoomName);
    let listener = listenToMessageUpdates(chatRoomId, async () => {
      await onDisplayNotification(chatRoomName, channelId);
    });

    setChatRoomSnapShots(oldSnapShots => [listener, ...oldSnapShots]);
  };

  return (
    <NotificationContext.Provider
      value={{
        listenToChatRoom
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
