import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME_CHAT_ROOM, SCREEN_NAME_CHAT_ROOMS_LIST} from '../utils/globals';
import {colors} from '../theme/colors';
import {ChatRoomsScreen} from '../screens/ChatRoomsScreen';
import {HeaderSignOutButton} from '../components/Navigation/HeaderSignOutButton';
import {ChatRoomScreen} from '../screens/ChatRoomScreen';
import {HeaderBackButton} from '../components/Navigation/HeaderBackButton';

export type AppStackParamList = {
  Choom: undefined;
  ChatRoom: {id: string; name: string};
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SCREEN_NAME_CHAT_ROOMS_LIST}
      screenOptions={{
        headerStyle: {backgroundColor: colors.ui.primary},
        headerTitleStyle: {color: colors.text.primary},
        headerRight: HeaderSignOutButton
      }}>
      <AppStack.Screen
        name={SCREEN_NAME_CHAT_ROOMS_LIST}
        component={ChatRoomsScreen}
        options={{
          headerRight: HeaderSignOutButton
        }}
      />
      <AppStack.Screen
        name={SCREEN_NAME_CHAT_ROOM}
        component={ChatRoomScreen}
        options={({route}) => ({
          title: route.params.name,
          headerLeft: HeaderBackButton,
          headerRight: undefined
        })}
      />
    </AppStack.Navigator>
  );
};
