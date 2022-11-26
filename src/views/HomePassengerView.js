import React from 'react';
import {View} from 'react-native';

import UserProfile from '../components/UserProfile';
import HomePassenger from '../components/HomePassenger';

export default function HomePassengerView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <UserProfile navigation={navigation}/>
      <HomePassenger navigation={navigation}/>
    </View>
  );
}

