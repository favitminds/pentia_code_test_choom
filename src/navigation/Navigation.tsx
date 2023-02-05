import {NavigationContainer} from '@react-navigation/native';
import {AuthenticationContext} from '../context/authentication/AuthenticationContext';
import {useContext} from 'react';
import {AuthNavigator} from './AuthNavigator';
import {AppNavigator} from './AppNavigator';

export const Navigation = () => {
  const {user} = useContext(AuthenticationContext);
  return (
    <NavigationContainer linking={{prefixes: ['choom://']}}>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
