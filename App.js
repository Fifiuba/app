import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import LoginView from './src/views/login-view'

export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar/>
      <LoginView />
    </View>
  );
}