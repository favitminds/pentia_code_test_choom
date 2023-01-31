import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {useContext} from 'react';
import {AuthenticationScreen} from '../screens/AuthenticationScreen';
import {ChatRoomsScreen} from '../screens/ChatRoomsScreen';
import {ChatRoomScreen} from '../screens/ChatRoomScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {user} = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Choom" component={ChatRoomsScreen} />
        ) : (
          <Stack.Screen
            name="Sign Up"
            options={{headerShown: false}}
            component={AuthenticationScreen}
          />
        )}
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
