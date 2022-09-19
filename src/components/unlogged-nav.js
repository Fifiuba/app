import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpView from '../views/sign-up-view';
import LoginView from '../views/login-view';

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login">
        {(navigation) =>
          <LoginView onLogin={props.onLogin} onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Signup">
        {(navigation) =>
          <SignUpView onNavigation={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
