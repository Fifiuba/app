import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/logged-nav';
import UnloggedNav from './src/components/unlogged-nav';
import MyProfileView from './src/views/profile-view';

export default function App() {
  const [connected, setConnected] = useState(false);
  return (
    <MyProfileView></MyProfileView>
    /*<NavigationContainer>
       {connected ? <LoggedNav /> : <UnloggedNav onLogin={setConnected}/>}
    </NavigationContainer>*/
)}