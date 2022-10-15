import React from 'react';
import HomeView from '../views/home-view';
import ProfileView from '../views/profile-view';
import EditProfileView from '../views/edit-profile-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoggedNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Home">
        {(navigation) =>
          <HomeView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: ''}}
        name="MiPerfil">
        {(navigation) =>
          <ProfileView onNavigation={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen
        options={{title: ''}}
        name="EditarPerfil">
        {(navigation) =>
          <EditProfileView onNavigation={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
