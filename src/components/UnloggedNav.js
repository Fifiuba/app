import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpView from '../views/SignUpView';
import LoginView from '../views/LoginView';
import ResetPasswordView from '../views/ResetPasswordView';
import DriverFormView from '../views/DriverFormView';
import PassengerFormView from '../views/PassengerFormView';
import {LoginContext} from '../context/LoginContext';

const Stack = createNativeStackNavigator();

export default function UnloggedNav({onLogin}) {
  const userId = 0;
  return (
    <LoginContext.Provider value={{onLogin, userId}}>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="IniciarSesion"
          component={LoginView}
        />
        <Stack.Screen
          options={{title: ''}}
          name="RecuperarContraseña"
          component={ResetPasswordView}
        />
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="Registrarse"
          component={SignUpView}
        />
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="PasajeroForm"
          component={PassengerFormView}
        />
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="ChoferForm"
          component={DriverFormView}
        />
      </Stack.Navigator>
    </LoginContext.Provider>
  );
}
