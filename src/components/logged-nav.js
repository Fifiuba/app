import React from 'react';
import HomeView from '../views/home-view';
import ProfileView from '../views/profile-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoggedNav() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
