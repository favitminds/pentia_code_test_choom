import notifee from '@notifee/react-native';

export const onDisplayNotification = async (chatRoomName: string, channelId: string) => {
  console.log('here');
  await notifee.requestPermission();

  // Display a notification
  await notifee.displayNotification({
    title: chatRoomName,
    body: `New messages in ${chatRoomName}`,
    android: {
      channelId: channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default'
      }
    }
  });
};

export const checkIfChannelExists = async (
  chatRoomId: string,
  userId: string,
  chatRoomName: string
) => {
  const channelId = `${userId}/${chatRoomId}`;
  let id = '';
  const channel = await notifee.getChannel(channelId);
  if (!channel) {
    id = await notifee.createChannel({
      id: channelId,
      name: chatRoomName
    });
    console.log('channel id created: ', id, '\n');
  } else {
    id = channel.id;
  }
  return id;
};
