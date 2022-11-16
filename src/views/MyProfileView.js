import React from 'react';
import {View} from 'react-native';

import MyProfile from '../components/MyProfile';

export default function MyProfileView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <MyProfile navigation={navigation}/>
    </View>
  );
}
