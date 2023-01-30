import {Button, StyleSheet, Text, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {LoginButton} from 'react-native-fbsdk-next';

type Props = {
  handleGoogleButtonPress: any;
  handleFacebookButtonPress: any;
};

export const AuthenticationScreen = ({
  handleGoogleButtonPress,
  handleFacebookButtonPress
}: Props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Google OAuth</Text>
      <GoogleSigninButton onPress={handleGoogleButtonPress} />
      <Text style={styles.title}>Facebook OAuth</Text>
      <Button title="Facebook Sign-In" onPress={handleFacebookButtonPress} />
      <LoginButton onLoginFinished={handleFacebookButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 30
  }
});
