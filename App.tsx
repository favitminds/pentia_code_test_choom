import React, {useEffect} from 'react';
import {Navigation} from './src/navigation/Navigation';
import {AuthenticationContextProvider} from './src/services/authentication/AuthenticationContext';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthenticationContextProvider>
      <Navigation />
    </AuthenticationContextProvider>
  );
}

export default App;
