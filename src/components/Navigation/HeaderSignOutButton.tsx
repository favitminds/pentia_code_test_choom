import {Icon} from '@rneui/themed';
import {useContext} from 'react';
import {AuthenticationContext} from '../../services/authentication/AuthenticationContext';

export const HeaderSignOutButton = () => {
  const {signOut} = useContext(AuthenticationContext);

  const onPressed = async () => {
    await signOut();
  };

  return <Icon name="logout" size={40} onPress={onPressed} />;
};
