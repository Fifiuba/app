import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpView from '../views/sign-up-view';
import LoginView from '../views/login-view';
import ProfileView from '../views/profile-view';
import EditProfileView from '../views/edit-profile-view';
import HomeView from '../views/home-view';
import ResetPasswordView from '../views/reset-password';

const Stack = createNativeStackNavigator();

export default function UnloggedNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reset Password">
        {(navigation) =>
          <ResetPasswordView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Home">
        {(navigation) =>
          <HomeView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Mi perfil">
        {(navigation) =>
          <ProfileView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Editar perfil">
        {(navigation) =>
          <EditProfileView onNavigation={navigation}/>
        }
      </Stack.Screen>
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
