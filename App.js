import React, {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/LoggedNav';
import UnloggedNav from './src/components/UnloggedNav';
import './FirebaseConfig';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {NotificationContext} from './src/context/NotificationContext';
import { TokenContext } from './src/context/TokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  
  const registerForPushNotificationsAsync = async () => {
       let token
       if (Platform.OS === 'android') {
         await Notifications.setNotificationChannelAsync('default', {
           name: 'default',
           importance: Notifications.AndroidImportance.MAX,
           vibrationPattern: [0, 250, 250, 250],
           lightColor: '#FF231F7C',
         });
       
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;}
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }         
        token = (await Notifications.getExpoPushTokenAsync()).data;
       return token;
      }
    }

    const checkAlreadyLoggedUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userType = await AsyncStorage.getItem('user_type');
        if (token && userType) {
          setIsLoggedIn(true)
        }          
      } catch (error) {
        setIsLoggedIn(false)
      }
    }

    const removeNotificationSubscription = (subs) => {
     Notifications.removeNotificationSubscription(subs);
    }
   
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => {
       console.log(token)
       setExpoPushToken(token)})
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      })
      return () => {
        removeNotificationSubscription(notificationListener.current);
      };
    }, [])


    useEffect(() => {
      checkAlreadyLoggedUser();
    },[])

   return (
    
    <NotificationContext.Provider value={notification}>
     <TokenContext.Provider value={expoPushToken}>
       <NavigationContainer>
         {isLoggedIn ? <LoggedNav onLogin={setIsLoggedIn}/> : <UnloggedNav onLogin={setIsLoggedIn}/>}
       </NavigationContainer>
     </TokenContext.Provider>
    </NotificationContext.Provider>
 )}