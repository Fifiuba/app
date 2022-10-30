import React from 'react';
import {View} from 'react-native';

import Journey from '../components/Journey';
import HomePassenger from '../components/HomePassenger';

export default function HomePassengerView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <HomePassenger navigation={navigation}/>
      <Journey navigation={navigation}/>
    </View>
  );
}

