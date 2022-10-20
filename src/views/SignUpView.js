import React from 'react';
import {View} from 'react-native';

import SignUpForm from '../components/SignUpForm';

export default function SignUpView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <SignUpForm
        navigation={navigation}
      />
    </View>
  );
}
