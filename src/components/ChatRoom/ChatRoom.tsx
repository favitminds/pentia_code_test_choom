import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigation/AppNavigator';
import {SCREEN_NAME_CHAT_ROOM} from '../../utils/globals';
import {colors} from '../../theme/colors';

type Props = {
  id: string;
  name: string;
  description: string;
};

export const ChatRoom = ({id, name, description}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const navigateToChatRoom = () => {
    navigation.navigate(SCREEN_NAME_CHAT_ROOM, {id, name});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToChatRoom}>
      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <ListItem.Chevron size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: colors.chatRoom.bg.primary,
    flex: 1,
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    flexDirection: 'column'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  description: {
    fontSize: 15,
    marginLeft: 10
  }
});
