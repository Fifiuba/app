import React from 'react';
import {View} from 'react-native';

import LoginForm from '../components/LoginForm';

export default function LoginView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <LoginForm navigation={navigation} />
    </View>
  );
}
