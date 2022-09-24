import React from 'react';
import {View} from 'react-native';
import Home from '../components/home';

export default function HomeView(props) {
  return (
    <View style={{flex: 1}}>
      <Home
        onNavigation={props.onNavigation.navigation}
      />
    </View>
  );
}

