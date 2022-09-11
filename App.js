import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/logged-nav';
import UnloggedNav from './src/components/unlogged-nav';

export default function App() {
  const [connected, setConnected] = useState(false);
  return (
    <NavigationContainer>
       {connected ? <LoggedNav /> : <UnloggedNav onLogin={setConnected}/>}
    </NavigationContainer>
)}
