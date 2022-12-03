import React from 'react';
import {ScrollView} from 'react-native';

import LoginForm from '../components/LoginForm';

export default function LoginView({navigation}) {
  return (
    <ScrollView style={{flex: 1}}>
      <LoginForm navigation={navigation} />
    </ScrollView>
  );
}
