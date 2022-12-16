import React from 'react';
import {ScrollView} from 'react-native';

import SignUpForm from '../components/SignUpForm';

export default function SignUpView({navigation}) {
  return (
    <ScrollView style={{flex: 1}}>
      <SignUpForm
        navigation={navigation}
      />
    </ScrollView>
  );
}
