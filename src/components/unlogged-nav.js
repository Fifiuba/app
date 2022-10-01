import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpView from '../views/sign-up-view';
import LoginView from '../views/login-view';
import ProfileView from '../views/profile-view';
import EditProfileView from '../views/edit-profile-view';
import HomeView from '../views/home-view';

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Iniciar">
        {(navigation) =>
          <LoginView onLogin={props.onLogin} onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Registrar">
        {(navigation) =>
          <SignUpView onNavigation={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
