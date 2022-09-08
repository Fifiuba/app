import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import SignUpView from './src/views/sign-up-view'

export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar/>
      <SignUpView />
    </View>
  );
}
