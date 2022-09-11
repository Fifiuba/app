import React from 'react';
import HomeView from '../views/home-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoggedNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={{title: 'Home'}}
      >
      </Stack.Screen>
    </Stack.Navigator>
  );
}
