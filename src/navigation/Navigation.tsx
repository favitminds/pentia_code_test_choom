import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {useContext} from 'react';
import {AuthenticationScreen} from '../screens/AuthenticationScreen';
import {ChatRoomsScreen} from '../screens/ChatRoomsScreen';
import {ChatRoomScreen} from '../screens/ChatRoomScreen';
import {
  SCREEN_NAME_CHAT_ROOM,
  SCREEN_NAME_CHAT_ROOMS_LIST,
  SCREEN_NAME_SIGN_UP
} from '../utils/globals';

export type StackParamList = {
  Choom: undefined;
  SignUp: undefined;
  ChatRoom: {id: string; name: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

export const Navigation = () => {
  const {user} = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name={SCREEN_NAME_CHAT_ROOMS_LIST} component={ChatRoomsScreen} />
        ) : (
          <Stack.Screen
            name={SCREEN_NAME_SIGN_UP}
            options={{headerShown: false}}
            component={AuthenticationScreen}
          />
        )}
        <Stack.Screen
          name={SCREEN_NAME_CHAT_ROOM}
          component={ChatRoomScreen}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
