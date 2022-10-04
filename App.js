import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/logged-nav';
import UnloggedNav from './src/components/unlogged-nav';
//import './firebaseConfig';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD_fAr5j7fbdhezakqnBmSLW2xEZ9Uki2U",
  authDomain: "user-service-9def8.firebaseapp.com",
  databaseURL: "https://user-service-9def8-default-rtdb.firebaseio.com",
  projectId: "user-service-9def8",
  storageBucket: "user-service-9def8.appspot.com",
  messagingSenderId: "627165168741",
  appId: "1:627165168741:web:23447b751047a7ca24b28c",
  measurementId: "G-YL8STET37V"
};

// Initialize Firebase
initializeApp({firebaseConfig});

export default function App() {

  const [connected, setConnected] = useState(false);
  return (
    <NavigationContainer>
       {connected ? <LoggedNav /> : <UnloggedNav onLogin={setConnected}/>}
    </NavigationContainer>
)}
    