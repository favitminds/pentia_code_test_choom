import {Icon} from '@rneui/themed';
import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthenticationContext} from '../../services/authentication/AuthenticationContext';
import {colors} from '../../theme/colors';

export const HeaderSignOutButton = () => {
  const {signOut} = useContext(AuthenticationContext);

  const onPressed = async () => {
    await signOut();
  };

  return <Icon name="logout" size={30} onPress={onPressed} iconStyle={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    color: colors.text.primary,
    fontSize: 30
  }
});
