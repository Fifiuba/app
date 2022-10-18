import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpView from '../views/SignUpView';
import LoginView from '../views/LoginView';
import ResetPasswordView from '../views/ResetPassword';

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="IniciarSesion">
        {(navigation) =>
          <LoginView onLogin={props.onLogin} onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: ''}}
        name="RecuperarContraseña">
        {(navigation) =>
          <ResetPasswordView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Registrarse">
        {(navigation) =>
          <SignUpView onNavigation={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
