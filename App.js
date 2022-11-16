import React, {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNav from './src/components/LoggedNav';
import UnloggedNav from './src/components/UnloggedNav';
import './FirebaseConfig';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
      let token;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
      return token;
  }


  const removeNotificationSubscription = (subs) => {
      Notifications.removeNotificationSubscription(subs);
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
      setNotification(notification);
    });

    return () => {
      removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedNav onLogin={setIsLoggedIn}/> : <UnloggedNav onLogin={setIsLoggedIn}/>}
    </NavigationContainer>
)}
    