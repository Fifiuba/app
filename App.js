import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoggedNav from './src/components/LoggedNav';
import UnloggedNav from './src/components/UnloggedNav';
import './FirebaseConfig';
import { LoginContext } from './src/context/LoginContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedNav /> : <UnloggedNav onLogin={setIsLoggedIn}/>}
    </NavigationContainer>
)}
    