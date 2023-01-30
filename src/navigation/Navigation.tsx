import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {useContext} from 'react';
import Authenticated from '../screens/AuthenticatedScreen';
import {AuthenticationScreen} from '../screens/AuthenticationScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {user} = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Authenticated} />
        ) : (
          <Stack.Screen
            name="Sign Up"
            options={{headerShown: false}}
            component={AuthenticationScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
