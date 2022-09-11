import React from 'react';
import {View} from 'react-native';
import SignUpForm from '../components/sign-up-form';

export default function SignUpView(props) {
  console.log("\n\nPROPS signupVIEW\n\n", props)
  return (
    <View style={{flex: 1}}>
      <SignUpForm onLogin={props.onLogin}/>
    </View>
  );
}
