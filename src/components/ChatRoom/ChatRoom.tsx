import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

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
    <View style={styles.container}>
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <ListItem.Chevron onPress={navigateToChatRoom} />
    </View>
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
