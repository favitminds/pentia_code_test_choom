import {StyleSheet, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {SocialIcon} from '@rneui/themed';

export const AuthenticationScreen = () => {
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

  async function handleFacebookButtonPress() {
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

  return (
    <>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.row}>
          <SocialIcon type="facebook" iconType="font-awesome" onPress={handleFacebookButtonPress} />
          <SocialIcon type="google" iconType="font-awesome" onPress={handleGoogleButtonPress} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginSection: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 25,
    marginBottom: 30
  }
});
