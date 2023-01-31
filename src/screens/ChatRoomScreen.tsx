import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export const ChatRoomScreen = () => {
  const route = useRoute();
  const test = route.params;

  console.log(test);

  return (
    <View>
      <Text>HELLLO FROM CHAt</Text>
    </View>
  );
};
