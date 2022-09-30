import React from 'react';
import {View} from 'react-native';
import EditProfile from '../components/edit-profile';

export default function EditProfileView(props) {
  return (
    <View style={{flex: 1}}>
      <EditProfile
        onNavigation={props.onNavigation.navigation}
      />
    </View>
  );
}
