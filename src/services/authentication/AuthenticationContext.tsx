import React, {useState, createContext} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

interface IAuthenticationContext {
  user: FirebaseAuthTypes.User | undefined;
  error: string;
  handleGoogleAuthentication: () => void;
  handleFacebookAuthentication: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthenticationContext = createContext<IAuthenticationContext>({
  error: '',
  handleFacebookAuthentication() {},
  handleGoogleAuthentication() {},
  user: undefined
});

GoogleSignin.configure({
  webClientId: '363548945580-gij69m7i7kjpr9tgdjv3sg1m9qusejt8.apps.googleusercontent.com'
});

export const AuthenticationContextProvider = ({children}: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [error, setError] = useState<string>('');

  const handleGoogleAuthentication = async () => {
    try {
      // get the user id token
      const {idToken} = await GoogleSignin.signIn();
      // create a credential using the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // authenticate the user using the credential
      const userCredentials = await auth().signInWithCredential(googleCredential);
      setUser(userCredentials.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log('error', error);
      }
    }
  };

  const handleFacebookAuthentication = async () => {
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
      const userCredentials = await auth().signInWithCredential(facebookCredential);
      setUser(userCredentials.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log('error', error);
      }
    }
  };

  auth().onAuthStateChanged(usr => {
    if (usr) {
      setUser(usr);
    } else {
      setUser(undefined);
    }
  });

  return (
    <AuthenticationContext.Provider
      value={{error, handleFacebookAuthentication, handleGoogleAuthentication, user}}>
      {children}
    </AuthenticationContext.Provider>
  );
};
