import {StyleSheet, Text, View} from 'react-native';
import {SocialIcon} from '@rneui/themed';
import {AuthenticationContext} from '../services/authentication/AuthenticationContext';
import {useContext} from 'react';

const AuthenticationScreen = () => {
  const {handleFacebookAuthentication, handleGoogleAuthentication} =
    useContext(AuthenticationContext);

  return (
    <>
      <View style={styles.screen}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.row}>
          <SocialIcon
            type="facebook"
            iconType="font-awesome"
            onPress={handleFacebookAuthentication}
          />
          <SocialIcon type="google" iconType="font-awesome" onPress={handleGoogleAuthentication} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
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

export default AuthenticationScreen;
