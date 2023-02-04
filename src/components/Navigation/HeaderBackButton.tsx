import {useNavigation} from '@react-navigation/native';
import {ListItem} from '@rneui/themed';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigation/AppNavigator';

export const HeaderBackButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <ListItem.Chevron
      size={40}
      style={{transform: [{rotate: '180deg'}], marginRight: 10}}
      onPress={() => navigation.goBack()}
    />
  );
};
