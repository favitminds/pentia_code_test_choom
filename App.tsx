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

  async function handleGoogleButtonPress() {
    try {
      // get the user id token
      const {idToken} = await GoogleSignin.signIn();
      // create a credential using the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // authenticate the user using the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('error', error);
    }
  }

  // return (
  //   // <NavigationContainer>
  //   //   <Stack.Navigator>
  //   //     <Stack.Screen name="Home" component={HomeScreen} />
  //   //   </Stack.Navigator>
  //   // </NavigationContainer>
  // );
  if (authenticated) {
    return <Authenticated />;
  }
  return (
    <AuthenticationScreen
      handleFacebookButtonPress={onFacebookButtonPress}
      handleGoogleButtonPress={handleGoogleButtonPress}
    />
  );
}

export default App;
