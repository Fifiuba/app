import React from 'react';
import {View} from 'react-native';

import SignUpForm from '../components/SignUpForm';

export default function SignUpView(props) {
  return (
    <View style={{flex: 1}}>
      <SignUpForm
        onNavigation={props.onNavigation.navigation}
      />
    </View>
  );
}
