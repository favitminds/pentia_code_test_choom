import React, {useEffect} from 'react';
import {Navigation} from './src/navigation/Navigation';
import {AuthenticationContextProvider} from './src/context/authentication/AuthenticationContext';
import SplashScreen from 'react-native-splash-screen';
import {NotificationContextProvider} from './src/context/notifications/NotificationContext';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthenticationContextProvider>
      <NotificationContextProvider>
        <Navigation />
      </NotificationContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
