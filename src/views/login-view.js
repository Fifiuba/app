import React from 'react';
import {View} from 'react-native';
import LoginForm from '../components/login-form';

export default function LoginView(props) {
  return (
    <View style={{flex: 1}}>
      <LoginForm
        onLogin={props.onLogin}
        onNavigation={props.onNavigation.navigation}
      />
    </View>
  );
}
