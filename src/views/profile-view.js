import React from 'react';
import {View} from 'react-native';
import Profile from '../components/profile';

export default function ProfileView(props) {
  return (
    <View style={{flex: 1}}>
      <Profile
        onNavigation={props.onNavigation.navigation}
        name='Celeste Dituro' 
        email='celedituro@gmail.com' 
        phone='02364579854'
      />
    </View>
  );
}
