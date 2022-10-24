import React from 'react';
import {View} from 'react-native';

import Home from '../components/Home';
import Journey from '../components/Journey';

export default function HomeView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Home navigation={navigation}/>
      <Journey navigation={navigation}/>
    </View>
  );
}

