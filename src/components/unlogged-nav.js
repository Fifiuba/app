import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpView from '../views/sign-up-view';
import LoginView from '../views/login-view';
import ResetPasswordView from '../views/reset-password';

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: ''}}
        name="Iniciar sesión">
        {(navigation) =>
          <LoginView onLogin={props.onLogin} onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: ''}}
        name="Recuperar contraseña">
        {(navigation) =>
          <ResetPasswordView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: ''}}
        name="Registrar">
        {(navigation) =>
          <SignUpView onNavigation={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
