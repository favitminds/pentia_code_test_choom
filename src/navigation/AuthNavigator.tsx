import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationScreen} from '../screens/AuthenticationScreen';
import {SCREEN_NAME_SIGN_UP} from '../utils/globals';

export type AuthStackParamList = {
  SignUp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SCREEN_NAME_SIGN_UP}
        options={{headerShown: false}}
        component={AuthenticationScreen}
      />
    </AuthStack.Navigator>
  );
};
