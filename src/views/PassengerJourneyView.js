import React from 'react';
import {View} from 'react-native';

import PassengerJourney from '../components/PassengerJourney';
import UserProfile from '../components/UserProfile';

export default function PassengerJourneyView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <UserProfile navigation={navigation}/>
      <PassengerJourney navigation={navigation}/>
    </View>
  );
}

