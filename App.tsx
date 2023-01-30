import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthenticationScreen} from './src/screens/AuthenticationScreen';
import Authenticated from './src/screens/AuthenticatedScreen';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: '363548945580-gij69m7i7kjpr9tgdjv3sg1m9qusejt8.apps.googleusercontent.com'
});

const Stack = createNativeStackNavigator();

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  // return (
  //   // <NavigationContainer>
  //   //   <Stack.Navigator>
  //   //     <Stack.Screen name="Home" component={HomeScreen} />
  //   //   </Stack.Navigator>
  //   // </NavigationContainer>
  // );
  return authenticated ? <Authenticated /> : <AuthenticationScreen />;
}

export default App;
