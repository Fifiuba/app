import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/LoggedNav';
import UnloggedNav from './src/components/UnloggedNav';
import './FirebaseConfig';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
       {isLoggedIn ? <LoggedNav /> : <UnloggedNav onLogin={setIsLoggedIn}/>}
    </NavigationContainer>
)}
    