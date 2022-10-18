import React from 'react';
import {View} from 'react-native';

import Profile from '../components/Profile';

export default function ProfileView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Profile navigation={navigation}/>
    </View>
  );
}
