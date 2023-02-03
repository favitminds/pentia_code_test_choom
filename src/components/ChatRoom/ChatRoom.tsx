import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

type Props = {
  id: string;
  name: string;
  description: string;
};

export const ChatRoom = ({id, name, description}: Props) => {
  const navigation = useNavigation();

  const navigateToChatRoom = () => {
    navigation.navigate('ChatRoom' as never, {id, name} as never);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToChatRoom}>
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <ListItem.Chevron />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'red',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
