import {StyleSheet, Text, View} from 'react-native';
import {SocialIcon} from '@rneui/themed';
import {AuthenticationContext} from '../context/authentication/AuthenticationContext';
import {useContext} from 'react';
import {colors} from '../theme/colors';

export const AuthenticationScreen = () => {
  const {handleFacebookAuthentication, handleGoogleAuthentication} =
    useContext(AuthenticationContext);

  return (
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
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bg.primary,
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
    color: colors.text.primary,
    fontSize: 25,
    marginBottom: 30
  }
});
