import React from 'react';
import {View} from 'react-native';
import DriverJourney from '../components/DriverJourney';

export default function DriverJourneyView({navigation, route}) {
  return (
    <View style={{flex: 1}}>
      <DriverJourney navigation={navigation} route={route}/>
    </View>
  );
}
