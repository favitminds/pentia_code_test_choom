import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from '@rneui/themed';

type Props = {
  name: string;
  description: string;
};

export const ChatRoom = ({name, description}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <ListItem.Chevron />
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
