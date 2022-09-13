import * as React from 'react';
import {View} from 'react-native';
import LoginForm from '../components/login-form';

export default function LoginView() {
  return (
    <View style={{flex: 1}}>
      <LoginForm/>
    </View>
  );
}
