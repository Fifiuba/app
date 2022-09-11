import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpView from '../views/sign-up-view'

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>       
      <Stack.Screen
        name="Signup"
        options={{ title: 'Registrarse'}}>
        {() => <SignUpView onLogin={props.onLogin} />}
      </Stack.Screen>
      <Stack.Screen
        name="Login"
        options={{ title: 'Ingresar'}}>
        {() => <SignUpView onLogin={props.onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
)}
